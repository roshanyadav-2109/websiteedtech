
-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view active notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Authenticated can insert notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Creator or admin can update notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Users can delete their own notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Public can read notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Admins can manage notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Admins can delete notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Admins can insert notes" ON public.iitm_branch_notes;
DROP POLICY IF EXISTS "Admins can update notes" ON public.iitm_branch_notes;

-- Enable RLS on iitm_branch_notes table
ALTER TABLE public.iitm_branch_notes ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if current user email is the hardcoded admin
  IF auth.email() = 'uiwebsite638@gmail.com' THEN
    RETURN TRUE;
  END IF;
  
  -- Check if user exists in admin_users table
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.email()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Policy 1: Anyone can view active notes (SELECT for public role)
CREATE POLICY "Anyone can view active notes"
  ON public.iitm_branch_notes
  FOR SELECT
  USING (is_active = true);

-- Policy 2: Only admins can insert notes (INSERT for authenticated role, admin check)
CREATE POLICY "Admins can insert notes"
  ON public.iitm_branch_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_current_user_admin());

-- Policy 3: Only admins can update notes (UPDATE for authenticated role, admin check)
CREATE POLICY "Admins can update notes"
  ON public.iitm_branch_notes
  FOR UPDATE
  TO authenticated
  USING (public.is_current_user_admin())
  WITH CHECK (public.is_current_user_admin());

-- Policy 4: Only admins can delete notes (DELETE for authenticated role, admin check)
CREATE POLICY "Admins can delete notes"
  ON public.iitm_branch_notes
  FOR DELETE
  TO authenticated
  USING (public.is_current_user_admin());
