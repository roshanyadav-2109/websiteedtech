
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdminCheck = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        console.log('No user email found');
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setIsLoading(false);
        return;
      }

      console.log('Checking admin status for:', user.email);

      try {
        // First check the hardcoded super admin
        if (user.email === 'uiwebsite638@gmail.com') {
          console.log('User is hardcoded super admin');
          setIsAdmin(true);
          setIsSuperAdmin(true);
          setIsLoading(false);
          return;
        }

        // Check if user is in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('email, is_super_admin')
          .eq('email', user.email)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setIsSuperAdmin(false);
        } else if (data) {
          console.log('Admin user found:', data);
          setIsAdmin(true);
          setIsSuperAdmin(data.is_super_admin);
        } else {
          console.log('User not found in admin_users table');
          setIsAdmin(false);
          setIsSuperAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setIsSuperAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user?.email]);

  console.log('Admin check result:', { isAdmin, isSuperAdmin, isLoading, userEmail: user?.email });

  return { isAdmin, isSuperAdmin, isLoading };
};
