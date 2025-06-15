
-- Add new columns to existing tables and create new tables for comprehensive admin panel

-- Update notes table to support JEE/NEET/IITM BS specific fields
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS class_level text;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS session text;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS shift text;

-- Update pyqs table to support JEE/NEET/IITM BS specific fields  
ALTER TABLE public.pyqs ADD COLUMN IF NOT EXISTS session text;
ALTER TABLE public.pyqs ADD COLUMN IF NOT EXISTS shift text;

-- Update courses table to support student enrollment count
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS students_enrolled integer DEFAULT 0;

-- Create study groups table
CREATE TABLE IF NOT EXISTS public.study_groups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  join_link text NOT NULL,
  social_handle_type text NOT NULL CHECK (social_handle_type IN ('Telegram', 'WhatsApp')),
  exam_type text,
  subject text,
  branch text,
  level text,
  class_level text,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create communities table for IITM BS Padhai Mitra
CREATE TABLE IF NOT EXISTS public.communities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  branch text,
  level text NOT NULL CHECK (level IN ('Foundation', 'Diploma', 'Degree')),
  subject text,
  join_link text NOT NULL,
  exam_type text DEFAULT 'IITM_BS',
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Update news_updates table with datetime and tags
ALTER TABLE public.news_updates ADD COLUMN IF NOT EXISTS tag text;
ALTER TABLE public.news_updates ADD COLUMN IF NOT EXISTS date_time timestamp with time zone DEFAULT now();

-- Update important_dates table with tags and enhanced description
ALTER TABLE public.important_dates ADD COLUMN IF NOT EXISTS tag text;
ALTER TABLE public.important_dates ADD COLUMN IF NOT EXISTS matter text;

-- Add RLS policies for new tables
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- RLS policies for study_groups (public read, admin write)
CREATE POLICY "Anyone can view study groups" ON public.study_groups FOR SELECT USING (true);
CREATE POLICY "Only admins can manage study groups" ON public.study_groups FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- RLS policies for communities (public read, admin write)  
CREATE POLICY "Anyone can view communities" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Only admins can manage communities" ON public.communities FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notes_exam_type_subject ON public.notes(exam_type, subject);
CREATE INDEX IF NOT EXISTS idx_pyqs_exam_type_subject_year ON public.pyqs(exam_type, subject, year);
CREATE INDEX IF NOT EXISTS idx_study_groups_exam_type ON public.study_groups(exam_type);
CREATE INDEX IF NOT EXISTS idx_communities_branch_level ON public.communities(branch, level);
CREATE INDEX IF NOT EXISTS idx_courses_exam_category ON public.courses(exam_category);
