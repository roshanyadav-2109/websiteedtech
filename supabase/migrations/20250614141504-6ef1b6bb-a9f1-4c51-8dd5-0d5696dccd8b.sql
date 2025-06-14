
-- Enable Row Level Security for notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read notes (public facing)
CREATE POLICY "Public can read notes"
  ON public.notes
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert notes (created_by set to their user id or left null)
CREATE POLICY "Authenticated can insert notes"
  ON public.notes
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by IS NULL OR created_by = auth.uid());

-- Allow editors to update notes that they created OR admin to patch later (optional, for upserts)
CREATE POLICY "Creator or admin can update notes"
  ON public.notes
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM public.admin_users WHERE email = (SELECT email FROM public.profiles WHERE id = auth.uid())
    )
  );

-- Do the same for pyqs

ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read pyqs"
  ON public.pyqs
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert pyqs"
  ON public.pyqs
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by IS NULL OR created_by = auth.uid());

CREATE POLICY "Creator or admin can update pyqs"
  ON public.pyqs
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM public.admin_users WHERE email = (SELECT email FROM public.profiles WHERE id = auth.uid())
    )
  );
