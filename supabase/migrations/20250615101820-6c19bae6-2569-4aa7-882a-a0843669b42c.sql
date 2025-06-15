
-- Add new columns to the courses table
ALTER TABLE public.courses
ADD COLUMN subject TEXT,
ADD COLUMN start_date DATE,
ADD COLUMN course_type TEXT,
ADD COLUMN branch TEXT,
ADD COLUMN level TEXT,
ADD COLUMN enroll_now_link TEXT;

-- Rename 'category' to 'exam_category' for clarity and make it nullable
ALTER TABLE public.courses RENAME COLUMN category TO exam_category;
ALTER TABLE public.courses ALTER COLUMN exam_category DROP NOT NULL;
