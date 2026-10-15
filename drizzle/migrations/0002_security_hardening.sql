-- 0002_security_hardening.sql
--
-- Forward corrective migration for the CMS / roles / storage layer.
-- Written so that it is SAFE regardless of whether 0001_migration.sql has
-- already been applied to a real database: every statement is guarded and
-- idempotent. It does NOT delete existing administrator or editor records.
--
-- Deploy order: 0000_migration -> 0001_migration -> 0002_security_hardening.
-- Run against production only after review. Nothing here drops data.

-- ---------------------------------------------------------------------------
-- 1. Remove the insecure "first registered account becomes admin" mechanism.
--
-- 0001_migration.sql installs public.assign_first_admin() as an AFTER INSERT
-- trigger on auth.users, which grants the 'admin' role to the first account
-- created while no administrator exists. Because /auth supports public
-- registration, an attacker could register first and take over the CMS.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('auth.users') IS NOT NULL THEN
    BEGIN
      DROP TRIGGER IF EXISTS on_auth_user_created_first_admin ON auth.users;
    EXCEPTION
      WHEN insufficient_privilege THEN
        RAISE WARNING 'MANUAL ACTION REQUIRED: could not drop trigger on_auth_user_created_first_admin (insufficient privilege). Drop it manually as a role that owns auth.users.';
    END;
  END IF;

  IF to_regclass('public.user_roles') IS NOT NULL
     AND EXISTS (
       SELECT 1 FROM pg_proc p
       JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = 'assign_first_admin'
     ) THEN
    DROP FUNCTION public.assign_first_admin();
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Controlled first-administrator bootstrap.
--
-- Callable ONLY by the service role (server-side operator tooling) or an
-- administrator SQL session. Never reachable from the public /auth page,
-- from anon, or from authenticated (editor) sessions. Refuses to run once
-- any administrator exists, so it cannot be used to mint extra admins later.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(_user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_role_row_id uuid;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'bootstrap_first_admin: a user id is required';
  END IF;

  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RAISE EXCEPTION 'bootstrap_first_admin: an administrator already exists. Use the Team page (or an admin SQL session) to grant access.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = _user_id) THEN
    RAISE EXCEPTION 'bootstrap_first_admin: no authentication user exists with that id';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  RETURNING id INTO v_role_row_id;

  RETURN _user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.bootstrap_first_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(uuid) TO service_role;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(uuid) TO postgres';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'supabase_admin') THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(uuid) TO supabase_admin';
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Harden the role-checking functions.
--    * explicit pinned search_path (SECURITY DEFINER safety)
--    * an authenticated caller may only check their own id, unless they are
--      already an admin (so editors cannot probe other users' roles)
--    * calls without a JWT claim (service role / SQL session) stay unrestricted
--    * EXECUTE revoked from PUBLIC and anon
--    is_staff() is created first because has_role() calls it.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT _user_id IS NOT NULL
     AND (auth.uid() IS NULL OR _user_id = auth.uid())
     AND EXISTS (
       SELECT 1 FROM public.user_roles r
       WHERE r.user_id = _user_id AND r.role IN ('admin', 'editor')
     );
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = _user_id
      AND r.role = _role
      AND (auth.uid() IS NULL OR _user_id = auth.uid() OR public.is_staff(auth.uid()))
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO postgres';
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO postgres';
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 4. Server-side validation of every CMS write (defence in depth).
--    Key allow-list, JSON shape/size limits and updated_by ownership are
--    enforced by PostgreSQL, not only by the admin UI.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.cms_entries') IS NULL THEN
    RAISE WARNING 'public.cms_entries does not exist yet (0001_migration not applied). Skipping CMS write validation trigger.';
    RETURN;
  END IF;

  CREATE OR REPLACE FUNCTION public.validate_cms_entry()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = public, pg_catalog
  AS $fn$
  BEGIN
    IF NEW.key IS NULL
       OR char_length(NEW.key) > 100
       OR NEW.key !~ '^(site|home|hero|page:/[a-z0-9][a-z0-9/-]*)$' THEN
      RAISE EXCEPTION 'cms_entries: key "%" is not an allowed content key', left(COALESCE(NEW.key, ''), 100);
    END IF;

    IF jsonb_typeof(NEW.data) IS NULL
       OR jsonb_typeof(NEW.data) NOT IN ('object', 'array') THEN
      RAISE EXCEPTION 'cms_entries: data for key "%" must be a JSON object or array', NEW.key;
    END IF;

    IF pg_column_size(NEW.data) > 262144 THEN
      RAISE EXCEPTION 'cms_entries: data for key "%" exceeds the 256 KB limit', NEW.key;
    END IF;

    IF auth.uid() IS NOT NULL AND NEW.updated_by IS DISTINCT FROM auth.uid() THEN
      RAISE EXCEPTION 'cms_entries: updated_by must match the signed-in user';
    END IF;

    RETURN NEW;
  END;
  $fn$;

  DROP TRIGGER IF EXISTS validate_cms_entry_on_write ON public.cms_entries;
  CREATE TRIGGER validate_cms_entry_on_write
    BEFORE INSERT OR UPDATE ON public.cms_entries
    FOR EACH ROW EXECUTE FUNCTION public.validate_cms_entry();
END $$;

-- ---------------------------------------------------------------------------
-- 5. Media bucket: deliberately public READ for website photography, with
--    uploads/replacements/deletions still restricted to staff, server-side
--    size and MIME allow-lists enforced by Storage, and object names that
--    cannot contain path separators or traversal segments.
--
--    NOTE: this makes every object already stored in the 'cms-media' bucket
--    publicly readable. Review the bucket contents before applying.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  v_cols text[];
BEGIN
  IF to_regclass('storage.buckets') IS NULL THEN
    RAISE WARNING 'storage.buckets not found. Create the "cms-media" bucket manually and set it to public.';
    RETURN;
  END IF;

  INSERT INTO storage.buckets (id, name, public)
  VALUES ('cms-media', 'cms-media', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  SELECT array_agg(column_name) INTO v_cols
  FROM information_schema.columns
  WHERE table_schema = 'storage' AND table_name = 'buckets';

  IF 'file_size_limit' = ANY (v_cols) THEN
    UPDATE storage.buckets
       SET file_size_limit = 5242880
     WHERE id = 'cms-media';
  END IF;

  IF 'allowed_mime_types' = ANY (v_cols) THEN
    UPDATE storage.buckets
       SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
     WHERE id = 'cms-media';
  END IF;
END $$;

DO $$
BEGIN
  IF to_regclass('storage.objects') IS NULL THEN
    RAISE WARNING 'storage.objects not found. Skipping storage policy hardening.';
    RETURN;
  END IF;

  DROP POLICY IF EXISTS "Staff upload cms media" ON storage.objects;
  CREATE POLICY "Staff upload cms media" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
      bucket_id = 'cms-media'
      AND public.is_staff(auth.uid())
      AND name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$'
      AND lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$'
    );

  DROP POLICY IF EXISTS "Staff update cms media" ON storage.objects;
  CREATE POLICY "Staff update cms media" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'cms-media' AND public.is_staff(auth.uid()))
    WITH CHECK (
      bucket_id = 'cms-media'
      AND public.is_staff(auth.uid())
      AND name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$'
      AND lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$'
    );
END $$;
