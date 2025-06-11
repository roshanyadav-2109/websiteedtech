
-- First, let's add the admin user to the admin_users table
INSERT INTO public.admin_users (email, is_super_admin, created_by)
VALUES ('uiwebsite638@gmail.com', true, null)
ON CONFLICT (email) DO UPDATE SET is_super_admin = true;

-- Create RLS policies for admin content management
-- Enable RLS on all tables if not already enabled
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for courses (admins can do everything)
CREATE POLICY "Admins can manage courses" ON public.courses
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Allow public read access to courses
CREATE POLICY "Anyone can view courses" ON public.courses
FOR SELECT TO anon, authenticated
USING (true);

-- Create policies for notes (admins can do everything)
CREATE POLICY "Admins can manage notes" ON public.notes
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Allow authenticated users to view notes
CREATE POLICY "Authenticated users can view notes" ON public.notes
FOR SELECT TO authenticated
USING (true);

-- Create policies for pyqs (admins can do everything)
CREATE POLICY "Admins can manage pyqs" ON public.pyqs
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Allow authenticated users to view pyqs
CREATE POLICY "Authenticated users can view pyqs" ON public.pyqs
FOR SELECT TO authenticated
USING (true);

-- Create policies for important_dates (admins can do everything)
CREATE POLICY "Admins can manage important_dates" ON public.important_dates
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Allow authenticated users to view important dates
CREATE POLICY "Authenticated users can view important_dates" ON public.important_dates
FOR SELECT TO authenticated
USING (true);

-- Create policies for news_updates (admins can do everything)
CREATE POLICY "Admins can manage news_updates" ON public.news_updates
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Allow authenticated users to view news
CREATE POLICY "Authenticated users can view news_updates" ON public.news_updates
FOR SELECT TO authenticated
USING (true);

-- Update the profiles role for the admin user
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'uiwebsite638@gmail.com';
