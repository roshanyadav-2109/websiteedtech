
-- Create testimonials table for user testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  position TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Users can insert their own testimonials
CREATE POLICY "Users can create testimonials" 
  ON public.testimonials 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own testimonials
CREATE POLICY "Users can view own testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Everyone can view approved testimonials
CREATE POLICY "Everyone can view approved testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (is_approved = true);

-- Admins can manage all testimonials
CREATE POLICY "Admins can manage testimonials" 
  ON public.testimonials 
  FOR ALL 
  USING (is_admin((SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Add trigger for updated_at
CREATE OR REPLACE TRIGGER handle_updated_at_testimonials
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
