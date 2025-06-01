
import React, { ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock } from 'lucide-react';

interface OptimizedAuthWrapperProps {
  children: ReactNode;
  contentType?: string;
  examType?: string;
}

const OptimizedAuthWrapper: React.FC<OptimizedAuthWrapperProps> = ({ 
  children, 
  contentType = "premium", 
  examType = "general" 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Quick session check without waiting
        const { data } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (data.session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth error:", error);
        if (mounted) setIsAuthenticated(false);
      }
    };

    // Immediate auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      setIsAuthenticated(!!session);
    });

    checkAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Show login required immediately if not authenticated
  if (isAuthenticated === false) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 border-amber-200 bg-amber-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-amber-600" />
          </div>
          <CardTitle className="text-amber-800">Login Required</CardTitle>
          <CardDescription className="text-amber-700">
            Access this premium content by signing in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-600 text-center">
            This content is only available to authenticated users.
            Please login or create an account to continue.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-royal hover:bg-royal-dark"
            onClick={() => {
              localStorage.setItem('authRedirectUrl', window.location.pathname);
              window.location.href = '/auth';
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Redirecting...
              </>
            ) : (
              "Log In or Sign Up"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Show loading only briefly
  if (isAuthenticated === null) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-royal" />
      </div>
    );
  }

  return <>{children}</>;
};

export default OptimizedAuthWrapper;
