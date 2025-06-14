
-- Insert the admin user email into admin_users table if it doesn't exist
INSERT INTO public.admin_users (email, is_super_admin) 
VALUES ('uiwebsite638@gmail.com', true)
ON CONFLICT (email) DO NOTHING;
