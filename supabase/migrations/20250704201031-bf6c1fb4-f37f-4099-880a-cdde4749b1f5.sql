
-- Add verification_certificate_url column to employees table
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS verification_certificate_url TEXT;

-- Update the comment to reflect the new column
COMMENT ON TABLE public.employees IS 'Stores employee and intern verification data with certificate links';
