-- ============================================================
-- HONEYTOTS SCHOOL — DATABASE SCHEMA (Phase One)
-- Generated: 27 October 2026
--
-- This is a snapshot of the live backend (Lovable Cloud) that
-- powers the Phase One public website and lightweight CMS:
--   • cms_entries        — website content (text, images, sections)
--   • contact_enquiries  — contact/enquiry form submissions
--   • visit_requests     — book-a-visit form submissions
--   • user_roles         — staff roles: 'admin' and 'editor'
--   • cms-media (storage)— image uploads for the CMS
--
-- Applying this file to an empty project reproduces the Phase One
-- backend. Row Level Security is enabled on every table, so visitors
-- can only read published content and submit forms, while signed-in
-- staff (admin/editor) manage the CMS.
--
-- NOTE: authentication itself (accounts, password sign-in) is managed
-- by the platform's auth service and is not part of this file.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Extensions
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid()

-- ------------------------------------------------------------
-- 2. Enumerated types
-- ------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- ------------------------------------------------------------
-- 3. Helper functions (used by RLS policies)
-- ------------------------------------------------------------

-- True when the given user holds a staff role (admin or editor).
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $function$
  SELECT _user_id IS NOT NULL
     AND (auth.uid() IS NULL OR _user_id = auth.uid())
     AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = _user_id AND r.role IN ('admin','editor'));
$function$;

-- True when the given user holds a specific role.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = _user_id AND r.role = _role
    AND (auth.uid() IS NULL OR _user_id = auth.uid() OR public.is_staff(auth.uid())));
$function$;

-- One-time bootstrap: creates the FIRST administrator only. Refuses
-- to run once any admin exists. Intended to be called exactly once,
-- by the school owner, when setting up the project.
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(_user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $function$
BEGIN
  IF _user_id IS NULL THEN RAISE EXCEPTION 'bootstrap_first_admin: a user id is required'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext('bootstrap_first_admin'));
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RAISE EXCEPTION 'bootstrap_first_admin: an administrator already exists.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = _user_id) THEN
    RAISE EXCEPTION 'bootstrap_first_admin: no authentication user exists with that id';
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin');
  RETURN _user_id;
END; $function$;

-- ------------------------------------------------------------
-- 4. Tables
-- ------------------------------------------------------------

-- Website content editable through the CMS. `key` identifies the
-- content slot (site details, homepage slides, page sections, etc.)
-- and `data` holds its JSON payload.
CREATE TABLE public.cms_entries (
  key         text        NOT NULL,
  data        jsonb       NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  updated_by  uuid,
  CONSTRAINT cms_entries_pkey PRIMARY KEY (key)
);

-- Contact / enquiry form submissions.
CREATE TABLE public.contact_enquiries (
  id            uuid        NOT NULL DEFAULT gen_random_uuid(),
  full_name     text        NOT NULL,
  email         text        NOT NULL,
  phone         text,
  enquiry_type  text        NOT NULL,
  message       text        NOT NULL,
  status        text        NOT NULL DEFAULT 'new',
  created_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_enquiries_pkey PRIMARY KEY (id),
  CONSTRAINT contact_enquiries_full_name_check CHECK (char_length(full_name) >= 1 AND char_length(full_name) <= 120),
  CONSTRAINT contact_enquiries_email_check CHECK (char_length(email) >= 3 AND char_length(email) <= 160),
  CONSTRAINT contact_enquiries_phone_check CHECK (phone IS NULL OR char_length(phone) <= 30),
  CONSTRAINT contact_enquiries_enquiry_type_check CHECK (char_length(enquiry_type) <= 40),
  CONSTRAINT contact_enquiries_message_check CHECK (char_length(message) >= 1 AND char_length(message) <= 2000)
);

-- Book-a-visit (school tour) requests.
CREATE TABLE public.visit_requests (
  id              uuid        NOT NULL DEFAULT gen_random_uuid(),
  guardian_name   text        NOT NULL,
  email           text        NOT NULL,
  phone           text        NOT NULL,
  child_name      text,
  child_age       text,
  intended_class  text,
  preferred_date  date,
  preferred_time  text,
  message         text,
  status          text        NOT NULL DEFAULT 'new',
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT visit_requests_pkey PRIMARY KEY (id),
  CONSTRAINT visit_requests_guardian_name_check CHECK (char_length(guardian_name) >= 1 AND char_length(guardian_name) <= 120),
  CONSTRAINT visit_requests_email_check CHECK (char_length(email) >= 3 AND char_length(email) <= 160),
  CONSTRAINT visit_requests_phone_check CHECK (char_length(phone) >= 5 AND char_length(phone) <= 30),
  CONSTRAINT visit_requests_child_name_check CHECK (child_name IS NULL OR char_length(child_name) <= 80),
  CONSTRAINT visit_requests_child_age_check CHECK (child_age IS NULL OR char_length(child_age) <= 2),
  CONSTRAINT visit_requests_intended_class_check CHECK (intended_class IS NULL OR char_length(intended_class) <= 40),
  CONSTRAINT visit_requests_preferred_time_check CHECK (preferred_time IS NULL OR char_length(preferred_time) <= 20),
  CONSTRAINT visit_requests_message_check CHECK (message IS NULL OR char_length(message) <= 1000)
);

-- Staff roles. user_id references the platform auth users table.
CREATE TABLE public.user_roles (
  id         uuid        NOT NULL DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL,
  role       public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE
);

CREATE INDEX user_roles_user_id_role_key_idx ON public.user_roles USING btree (user_id, role);

-- ------------------------------------------------------------
-- 5. CMS content validation trigger
-- ------------------------------------------------------------
-- Guards every write to cms_entries: allowed key format, data must
-- be a JSON object/array under 256 KB, and updated_by must match the
-- signed-in editor.
CREATE OR REPLACE FUNCTION public.validate_cms_entry()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_catalog'
AS $function$
BEGIN
  IF NEW.key IS NULL OR char_length(NEW.key) > 100
     OR NEW.key !~ '^(site|home|hero|page:/[a-z0-9][a-z0-9/-]*)$' THEN
    RAISE EXCEPTION 'cms_entries: key is not an allowed content key';
  END IF;
  IF jsonb_typeof(NEW.data) IS NULL OR jsonb_typeof(NEW.data) NOT IN ('object','array') THEN
    RAISE EXCEPTION 'cms_entries: data must be a JSON object or array';
  END IF;
  IF pg_column_size(NEW.data) > 262144 THEN
    RAISE EXCEPTION 'cms_entries: data exceeds the 256 KB limit';
  END IF;
  IF auth.uid() IS NOT NULL AND NEW.updated_by IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'cms_entries: updated_by must match the signed-in user';
  END IF;
  RETURN NEW;
END; $function$;

CREATE TRIGGER validate_cms_entry_on_write
BEFORE INSERT OR UPDATE ON public.cms_entries
FOR EACH ROW EXECUTE FUNCTION public.validate_cms_entry();

-- ------------------------------------------------------------
-- 6. Table access (GRANTs)
-- ------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.cms_entries TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_entries TO authenticated;

GRANT SELECT, INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT SELECT, INSERT ON public.visit_requests TO anon, authenticated;

GRANT SELECT ON public.user_roles TO authenticated;

-- ------------------------------------------------------------
-- 7. Row Level Security
-- ------------------------------------------------------------
ALTER TABLE public.cms_entries        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_requests     ENABLE ROW LEVEL SECURITY;

-- cms_entries: everyone may READ published content; only staff may
-- create, change or delete it.
CREATE POLICY "Anyone can read site content" ON public.cms_entries
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Staff insert content" ON public.cms_entries
  FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff update content" ON public.cms_entries
  FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff delete content" ON public.cms_entries
  FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Form submissions: anyone may submit (only while status = 'new');
-- nobody outside staff — handled by the app layer via a privileged
-- server call — may read the full submission lists.
CREATE POLICY "Public can submit enquiries" ON public.contact_enquiries
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');

CREATE POLICY "Public can submit visit requests" ON public.visit_requests
  FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');

-- Roles: users may see their own role; admins may see everyone's.
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING ((user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------
-- 8. Storage: cms-media bucket (CMS image uploads)
-- ------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-media', 'cms-media', true, 5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/avif']
);

CREATE POLICY "Staff read cms media" ON storage.objects
  FOR SELECT TO authenticated
  USING ((bucket_id = 'cms-media') AND public.is_staff(auth.uid()));

CREATE POLICY "Staff upload cms media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    (bucket_id = 'cms-media') AND public.is_staff(auth.uid())
    AND (name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$')
    AND (lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$')
  );

CREATE POLICY "Staff update cms media" ON storage.objects
  FOR UPDATE TO authenticated
  USING ((bucket_id = 'cms-media') AND public.is_staff(auth.uid()))
  WITH CHECK (
    (bucket_id = 'cms-media') AND public.is_staff(auth.uid())
    AND (name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$')
    AND (lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$')
  );

CREATE POLICY "Staff delete cms media" ON storage.objects
  FOR DELETE TO authenticated
  USING ((bucket_id = 'cms-media') AND public.is_staff(auth.uid()));

-- The cms-media bucket is public for READS by anonymous visitors
-- (needed so uploaded photos display on the website); writes are
-- limited to staff through the policies above.
GRANT SELECT ON storage.objects TO anon;

-- ============================================================
-- End of schema
-- ============================================================
