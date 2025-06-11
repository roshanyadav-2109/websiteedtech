
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "@/components/auth/GoogleAuth";
import EmailAuth from "@/components/auth/EmailAuth";
import ProfileSetup from "@/components/profile/ProfileSetup";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_completed')
            .eq('id', user.id)
            .single();

          if (profile?.profile_completed) {
            navigate('/');
          } else {
            setShowProfileSetup(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          setShowProfileSetup(true);
        }
      }
    };

    if (!authLoading) {
      checkProfileCompletion();
    }
  }, [user, authLoading, navigate]);

  const handleProfileComplete = () => {
    navigate('/');
  };

  if (authLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-xl">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (user && showProfileSetup) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24 pb-24">
          <ProfileSetup onComplete={handleProfileComplete} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24 pb-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Enter your details to create your account' 
                : 'Enter your credentials to access your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleAuth 
              isSignUp={isSignUp} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <EmailAuth 
              isSignUp={isSignUp} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />

            <div className="text-center text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-royal hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-royal hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
