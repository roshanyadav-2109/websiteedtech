
-- Add verification certificate URL column to employees table
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS verification_certificate_url TEXT;

-- Create updated_profiles table to store profile update history
CREATE TABLE IF NOT EXISTS public.updated_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT,
  program_type TEXT,
  branch TEXT,
  level TEXT,
  exam_type TEXT,
  student_status TEXT,
  subjects TEXT[],
  full_name TEXT,
  email TEXT,
  phone TEXT,
  class TEXT,
  exam TEXT,
  selected_subjects TEXT[],
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on updated_profiles table
ALTER TABLE public.updated_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for updated_profiles
CREATE POLICY "Users can view their own profile history" 
  ON public.updated_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile updates" 
  ON public.updated_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Fix the profiles table constraint issue by dropping the problematic constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_student_status_check;

-- Add a more flexible constraint that allows common values
ALTER TABLE public.profiles ADD CONSTRAINT profiles_student_status_check 
  CHECK (student_status IS NULL OR student_status IN ('Class 11', 'Class 12', 'Dropper', '11th', '12th'));
