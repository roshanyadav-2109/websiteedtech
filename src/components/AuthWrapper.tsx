
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Save current URL to redirect back after login
          setRedirectUrl(window.location.pathname);
          localStorage.setItem('authRedirectUrl', window.location.pathname);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-royal" />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Login Required</CardTitle>
          <CardDescription>
            You need to be logged in to access this content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This content is only available to authenticated users.
            Please login or create an account to continue.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-royal hover:bg-royal-dark"
            onClick={() => {
              window.location.href = '/auth';
            }}
          >
            Log In or Sign Up
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
