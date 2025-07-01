
-- Create recommendations table
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  recommendation_text TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  category TEXT DEFAULT 'General',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for recommendations
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies for recommendations
CREATE POLICY "Anyone can view active recommendations" 
  ON public.recommendations FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage recommendations" 
  ON public.recommendations FOR ALL 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.email()));

-- Add updated_at trigger
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.recommendations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
