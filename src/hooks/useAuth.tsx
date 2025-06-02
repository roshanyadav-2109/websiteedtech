
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
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

  const checkAdminStatus = async () => {
    if (!user?.email) {
      setIsAdmin(false);
      setIsSuperAdmin(false);
      return;
    }

    try {
      const { data: adminData } = await supabase.rpc('is_admin', { user_email: user.email });
      const { data: superAdminData } = await supabase.rpc('is_super_admin', { user_email: user.email });
      
      setIsAdmin(adminData || false);
      setIsSuperAdmin(superAdminData || false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setIsSuperAdmin(false);
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
