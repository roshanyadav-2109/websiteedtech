
-- Add button columns to news_updates table
ALTER TABLE public.news_updates 
ADD COLUMN IF NOT EXISTS button_text TEXT,
ADD COLUMN IF NOT EXISTS button_url TEXT;

-- Add comment to explain the new columns
COMMENT ON COLUMN public.news_updates.button_text IS 'Optional button text to display with the news item';
COMMENT ON COLUMN public.news_updates.button_url IS 'Optional button URL to link to when button is clicked';
