
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
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setUserRole(null);
      return;
    }

    try {
      // Check admin_users table
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('is_super_admin')
        .eq('email', user.email)
        .single();
      
      if (adminUser) {
        setIsAdmin(true);
        setIsSuperAdmin(adminUser.is_super_admin);
        setUserRole(adminUser.is_super_admin ? 'super_admin' : 'admin');
      } else {
        // Check profiles table for role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('email', user.email)
          .single();
        
        const role = profile?.role || 'student';
        setUserRole(role);
        setIsAdmin(role === 'admin' || role === 'super_admin');
        setIsSuperAdmin(role === 'super_admin');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setUserRole('student');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus();
          }, 0);
        } else {
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setUserRole(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
