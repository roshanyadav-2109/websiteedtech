
-- Create the jobs table to store job openings
CREATE TABLE public.jobs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    job_type text NOT NULL, -- e.g., 'Remote', 'Hybrid', 'Full-time'
    location text NOT NULL,
    stipend text, -- Stipend or salary range
    duration text,
    deadline date,
    skills text[],
    description text,
    requirements text[],
    application_url text,
    company text NOT NULL DEFAULT 'Unknown IITians',
    experience_level text,
    is_featured boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add comments to columns for clarity
COMMENT ON COLUMN public.jobs.job_type IS 'e.g., ''Remote'', ''Hybrid'', ''Full-time''';
COMMENT ON COLUMN public.jobs.stipend IS 'Stipend or salary range';
COMMENT ON COLUMN public.jobs.requirements IS 'List of job requirements';
COMMENT ON COLUMN public.jobs.is_active IS 'Controls visibility on the public career page';

-- Enable Row-Level Security on the jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read access for active jobs
CREATE POLICY "Allow public read access to active jobs"
  ON public.jobs
  FOR SELECT
  USING (is_active = true);

-- RLS Policy: Allow full access for admin users
CREATE POLICY "Allow admins full access to jobs"
  ON public.jobs
  FOR ALL
  USING (public.is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Create a trigger to automatically update the 'updated_at' timestamp on any row modification
CREATE TRIGGER on_jobs_update
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();
