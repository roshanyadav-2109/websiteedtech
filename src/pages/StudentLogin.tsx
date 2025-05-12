
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Check if user already exists with this email
        const { data: existingUsers, error: checkError } = await supabase
          .from('profiles')
          .select('email')
          .eq('email', email.toLowerCase())
          .limit(1);
          
        if (checkError) throw checkError;
        
        // If email already exists, prevent signup
        if (existingUsers && existingUsers.length > 0) {
          toast({
            title: "Email already registered",
            description: "Please use a different email or login with your existing account",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "Please check your email for verification.",
        });
        
        // Redirect to profile completion
        navigate("/profile/complete");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;

        toast({
          title: "Login successful!",
          description: "Welcome back!",
        });
        
        // Check if profile is complete
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', data.user.id)
            .single();
          
          if (!profile || !profile.full_name || !profile.phone) {
            navigate("/profile/complete");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error checking profile:", error);
          navigate("/profile/complete");
        }
      }
    } catch (error: any) {
      toast({
        title: isSignUp ? "Registration failed" : "Login failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/google-callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during Google login",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              {isSignUp ? "Create an Account" : "Login to Your Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? "Sign up to access all our study materials and features"
                : "Login to access premium study resources"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
            
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-royal hover:bg-royal-dark" disabled={isLoading}>
                {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <Button 
                variant="link" 
                className="pl-1 underline text-royal"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default StudentLogin;
