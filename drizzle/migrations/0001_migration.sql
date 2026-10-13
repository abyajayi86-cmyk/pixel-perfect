CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_first_admin
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();

CREATE TABLE public.cms_entries (
  key text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);
GRANT SELECT ON public.cms_entries TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_entries TO authenticated;
GRANT ALL ON public.cms_entries TO service_role;
ALTER TABLE public.cms_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.cms_entries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff insert content" ON public.cms_entries FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update content" ON public.cms_entries FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete content" ON public.cms_entries FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff read cms media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'cms-media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff upload cms media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff update cms media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cms-media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff delete cms media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cms-media' AND public.is_staff(auth.uid()));