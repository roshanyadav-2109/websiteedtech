
-- Add missing fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'student' CHECK (role IN ('student', 'admin', 'super_admin')),
ADD COLUMN IF NOT EXISTS student_name text,
ADD COLUMN IF NOT EXISTS subjects text[];

-- Create communities table for WhatsApp/Telegram groups
CREATE TABLE IF NOT EXISTS public.communities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  group_link text NOT NULL,
  group_type text NOT NULL CHECK (group_type IN ('telegram', 'whatsapp')),
  exam_type text CHECK (exam_type IN ('IITM_BS', 'JEE', 'NEET')),
  level text,
  branch text,
  subject text,
  class_level text,
  member_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid
);

-- Enable RLS on communities table
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Policy for students to view active communities
CREATE POLICY "Students can view active communities" 
  ON public.communities 
  FOR SELECT 
  USING (is_active = true);

-- Policy for admins to manage all communities
CREATE POLICY "Admins can manage communities" 
  ON public.communities 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Update trigger for communities table
CREATE OR REPLACE FUNCTION update_communities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON public.communities
  FOR EACH ROW
  EXECUTE FUNCTION update_communities_updated_at();

-- Set super_admin role for the specified email
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'uiwebsite638@gmail.com';

-- Add default student_name for existing profiles (can be updated later)
UPDATE public.profiles 
SET student_name = full_name 
WHERE student_name IS NULL AND full_name IS NOT NULL;
