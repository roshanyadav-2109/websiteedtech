
-- Fix the profiles table branch constraint to allow proper IITM BS branches
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_branch_check;

-- Add a new constraint that allows the correct branch values
ALTER TABLE public.profiles ADD CONSTRAINT profiles_branch_check 
  CHECK (branch IS NULL OR branch IN ('data-science', 'electronic-systems', 'Data Science', 'Electronic Systems', 'Data Science and Applications'));

-- Also fix any existing data that might have incorrect branch values
UPDATE public.profiles 
SET branch = 'data-science' 
WHERE branch = 'Data Science and Applications';

UPDATE public.profiles 
SET branch = 'electronic-systems' 
WHERE branch = 'Electronic Systems';
