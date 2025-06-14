
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userRole: string | null;
  signOut: () => Promise<void>;
  checkAdminStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const checkAdminStatus = async () => {
    if (!user?.email) {
      console.log('useAuth: No user email found');
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setUserRole(null);
      return;
    }

    console.log('useAuth: Checking admin status for:', user.email);

    try {
      // First check the hardcoded super admin
      if (user.email === 'uiwebsite638@gmail.com') {
        console.log('useAuth: User is hardcoded super admin');
        setIsAdmin(true);
        setIsSuperAdmin(true);
        setUserRole('super_admin');
        return;
      }

      // Check admin_users table
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('is_super_admin')
        .eq('email', user.email)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('useAuth: Error checking admin_users:', error);
      }

      if (adminUser) {
        console.log('useAuth: Admin user found:', adminUser);
        setIsAdmin(true);
        setIsSuperAdmin(adminUser.is_super_admin);
        setUserRole(adminUser.is_super_admin ? 'super_admin' : 'admin');
        return;
      }

      // Check profiles table for role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', user.email)
        .maybeSingle();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('useAuth: Error checking profiles:', profileError);
      }

      const role = profile?.role || 'student';
      console.log('useAuth: Profile role found:', role);
      setUserRole(role);
      setIsAdmin(role === 'admin' || role === 'super_admin');
      setIsSuperAdmin(role === 'super_admin');
      
    } catch (error) {
      console.error('useAuth: Error checking admin status:', error);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setUserRole('student');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setUserRole(null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('useAuth: Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (session?.user) {
          // Use setTimeout to defer admin check and prevent blocking
          setTimeout(() => {
            checkAdminStatus();
          }, 100);
        } else {
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setUserRole(null);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('useAuth: Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus();
        }, 100);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log('useAuth: Current state:', {
    userEmail: user?.email,
    isAdmin,
    isSuperAdmin,
    userRole,
    isLoading
  });

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      isAdmin,
      isSuperAdmin,
      userRole,
      signOut,
      checkAdminStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
