
-- This migration enables real-time updates on the iitm_branch_notes table.

-- 1. Set replica identity to FULL to include old and new data in update events.
ALTER TABLE public.iitm_branch_notes REPLICA IDENTITY FULL;

-- 2. Add the table to the supabase_realtime publication to broadcast changes.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'iitm_branch_notes'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.iitm_branch_notes;
  END IF;
END $$;
