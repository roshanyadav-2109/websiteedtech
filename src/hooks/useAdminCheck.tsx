
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdminCheck = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        console.log('No user email found');
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      console.log('Checking admin status for:', user.email);

      try {
        // First check the hardcoded super admin
        if (user.email === 'uiwebsite638@gmail.com') {
          console.log('User is hardcoded super admin');
          setIsAdmin(true);
          setIsLoading(false);
          return;
        }

        // Check if user is in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('email, is_super_admin')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else if (data) {
          console.log('Admin user found:', data);
          setIsAdmin(true);
        } else {
          console.log('User not found in admin_users table');
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user?.email]);

  console.log('Admin check result:', { isAdmin, isLoading, userEmail: user?.email });

  return { isAdmin, isLoading };
};
