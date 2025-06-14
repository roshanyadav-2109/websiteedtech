
-- Ensure the admin user is properly set up in the admin_users table
INSERT INTO public.admin_users (email, is_super_admin, created_by)
VALUES ('uiwebsite638@gmail.com', true, null)
ON CONFLICT (email) DO UPDATE SET 
  is_super_admin = true,
  created_at = COALESCE(admin_users.created_at, now());

-- Also update the profiles table to ensure the role is set correctly
INSERT INTO public.profiles (id, email, role, full_name, profile_completed)
SELECT 
  auth.users.id,
  'uiwebsite638@gmail.com',
  'super_admin',
  COALESCE(auth.users.raw_user_meta_data->>'full_name', auth.users.raw_user_meta_data->>'name', 'UI Website'),
  true
FROM auth.users 
WHERE auth.users.email = 'uiwebsite638@gmail.com'
ON CONFLICT (id) DO UPDATE SET 
  role = 'super_admin',
  email = 'uiwebsite638@gmail.com';
