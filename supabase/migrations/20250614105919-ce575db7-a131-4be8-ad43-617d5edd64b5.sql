
-- Update existing notes table to match requirements (only add missing columns)
ALTER TABLE public.notes 
ADD COLUMN IF NOT EXISTS file_link TEXT,
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS upload_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing pyqs table to match requirements (only add missing columns)  
ALTER TABLE public.pyqs
ADD COLUMN IF NOT EXISTS file_link TEXT,
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS upload_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing important_dates table to match requirements
ALTER TABLE public.important_dates 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN DEFAULT false;

-- Update existing news_updates table to match requirements
ALTER TABLE public.news_updates 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS is_important BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS publish_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create policies for notes (everyone can read, only authenticated can insert/update/delete)
DROP POLICY IF EXISTS "Anyone can view active notes" ON public.notes;
CREATE POLICY "Anyone can view active notes" ON public.notes
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can insert notes" ON public.notes;
CREATE POLICY "Authenticated users can insert notes" ON public.notes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update their own notes" ON public.notes;
CREATE POLICY "Users can update their own notes" ON public.notes
  FOR UPDATE USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their own notes" ON public.notes;
CREATE POLICY "Users can delete their own notes" ON public.notes
  FOR DELETE USING (auth.uid() = created_by);

-- Create policies for pyqs (everyone can read, only authenticated can insert/update/delete)
DROP POLICY IF EXISTS "Anyone can view active pyqs" ON public.pyqs;
CREATE POLICY "Anyone can view active pyqs" ON public.pyqs
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can insert pyqs" ON public.pyqs;
CREATE POLICY "Authenticated users can insert pyqs" ON public.pyqs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update their own pyqs" ON public.pyqs;
CREATE POLICY "Users can update their own pyqs" ON public.pyqs
  FOR UPDATE USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their own pyqs" ON public.pyqs;
CREATE POLICY "Users can delete their own pyqs" ON public.pyqs
  FOR DELETE USING (auth.uid() = created_by);

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT user_email = 'uiwebsite638@gmail.com';
$$;

-- Create download tracking function
CREATE OR REPLACE FUNCTION public.increment_download_count(
  table_name text,
  content_id uuid,
  user_email text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF table_name = 'notes' THEN
    UPDATE public.notes 
    SET download_count = download_count + 1 
    WHERE id = content_id AND is_active = true;
  ELSIF table_name = 'pyqs' THEN
    UPDATE public.pyqs 
    SET download_count = download_count + 1 
    WHERE id = content_id AND is_active = true;
  END IF;
END;
$$;
