DROP TRIGGER IF EXISTS on_auth_user_created_first_admin ON auth.users;
DROP FUNCTION IF EXISTS public.assign_first_admin();

CREATE OR REPLACE FUNCTION public.bootstrap_first_admin(_user_id uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog AS $$
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
END; $$;
REVOKE ALL ON FUNCTION public.bootstrap_first_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_catalog AS $$
  SELECT _user_id IS NOT NULL
     AND (auth.uid() IS NULL OR _user_id = auth.uid())
     AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = _user_id AND r.role IN ('admin','editor'));
$$;
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_catalog AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = _user_id AND r.role = _role
    AND (auth.uid() IS NULL OR _user_id = auth.uid() OR public.is_staff(auth.uid())));
$$;
REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.validate_cms_entry()
RETURNS trigger LANGUAGE plpgsql SET search_path = public, pg_catalog AS $fn$
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
END; $fn$;
DROP TRIGGER IF EXISTS validate_cms_entry_on_write ON public.cms_entries;
CREATE TRIGGER validate_cms_entry_on_write BEFORE INSERT OR UPDATE ON public.cms_entries
  FOR EACH ROW EXECUTE FUNCTION public.validate_cms_entry();

DROP POLICY IF EXISTS "Staff upload cms media" ON storage.objects;
CREATE POLICY "Staff upload cms media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND public.is_staff(auth.uid())
    AND name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$'
    AND lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$');
DROP POLICY IF EXISTS "Staff update cms media" ON storage.objects;
CREATE POLICY "Staff update cms media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND public.is_staff(auth.uid()))
  WITH CHECK (bucket_id = 'cms-media' AND public.is_staff(auth.uid())
    AND name ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,140}$'
    AND lower(name) ~ '\.(jpg|jpeg|png|webp|gif|avif)$');