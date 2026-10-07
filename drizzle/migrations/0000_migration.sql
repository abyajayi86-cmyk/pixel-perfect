CREATE TABLE public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 160),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  enquiry_type text NOT NULL CHECK (char_length(enquiry_type) <= 40),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.visit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_name text NOT NULL CHECK (char_length(guardian_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 160),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  child_name text CHECK (child_name IS NULL OR char_length(child_name) <= 80),
  child_age text CHECK (child_age IS NULL OR char_length(child_age) <= 2),
  intended_class text CHECK (intended_class IS NULL OR char_length(intended_class) <= 40),
  preferred_date date,
  preferred_time text CHECK (preferred_time IS NULL OR char_length(preferred_time) <= 20),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT INSERT ON public.visit_requests TO anon, authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;
GRANT ALL ON public.visit_requests TO service_role;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit enquiries" ON public.contact_enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Public can submit visit requests" ON public.visit_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');