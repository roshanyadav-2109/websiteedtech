
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GoogleAuth from "@/components/auth/GoogleAuth";
import EmailAuth from "@/components/auth/EmailAuth";
import ProfileSetup from "@/components/profile/ProfileSetup";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [authTab, setAuthTab] = useState("signin");
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileStatus = async () => {
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
      checkProfileStatus();
    }
  }, [user, authLoading, navigate]);

  const handleProfileComplete = () => {
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-24">
          <ProfileSetup onComplete={handleProfileComplete} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              Welcome to Unknown IITians
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access personalized study materials and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <GoogleAuth isSignUp={false} isLoading={isLoading} setIsLoading={setIsLoading} />
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>
                
                <EmailAuth isSignUp={false} isLoading={isLoading} setIsLoading={setIsLoading} />
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <GoogleAuth isSignUp={true} isLoading={isLoading} setIsLoading={setIsLoading} />
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or create account with email</span>
                  </div>
                </div>
                
                <EmailAuth isSignUp={true} isLoading={isLoading} setIsLoading={setIsLoading} />
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm text-gray-600">
              <p>Your data is secure and protected</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
