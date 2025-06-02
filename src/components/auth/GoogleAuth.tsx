
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { FcGoogle } from 'react-icons/fc';

interface GoogleAuthProps {
  isSignUp?: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ isSignUp = false, isLoading, setIsLoading }) => {
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/google-callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "An error occurred during Google authentication",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      <FcGoogle className="h-5 w-5" />
      {isSignUp ? 'Sign up with Google' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleAuth;
