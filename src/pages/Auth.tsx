
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
        setActiveTab("login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth'
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8 px-4">
        <Card className="w-full max-w-md shadow-lg border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {activeTab === "login" ? "Login" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login"
                ? "Enter your credentials to login to your account"
                : "Enter your details to create an account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <div className="space-y-4">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGoogleLogin}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M15.5 8.13802C15.5 7.54583 15.4535 7.13364 15.3535 6.70947H8V9.27269H12.3206C12.2419 9.91987 11.7742 10.9282 10.7703 11.6052L10.7539 11.7133L13.0932 13.4997L13.25 13.5136C14.7419 12.1591 15.5 10.3182 15.5 8.13802Z" fill="#4285F4"/>
                      <path d="M8 15.5001C10.1387 15.5001 11.9419 14.8184 13.25 13.5137L10.7703 11.6053C10.0903 12.0766 9.17097 12.4012 8 12.4012C5.91935 12.4012 4.15161 11.0535 3.52581 9.19373L3.42258 9.2007L1.00323 11.0457L0.96774 11.1445C2.26774 13.7445 4.93871 15.5001 8 15.5001Z" fill="#34A853"/>
                      <path d="M3.52581 9.19366C3.36129 8.76949 3.26452 8.31033 3.26452 7.833C3.26452 7.35567 3.36129 6.8965 3.51935 6.47233L3.51452 6.35767L1.05548 4.47967L0.967739 4.52166C0.354839 5.52933 0 6.6465 0 7.833C0 9.0195 0.354839 10.1367 0.967739 11.1443L3.52581 9.19366Z" fill="#FBBC05"/>
                      <path d="M8 3.26472C9.48387 3.26472 10.4677 3.92389 11.0323 4.44822L13.2581 2.31389C11.9355 1.09672 10.1387 0.333008 8 0.333008C4.93871 0.333008 2.26774 2.08861 0.96774 4.6886L3.51935 6.47244C4.15161 4.61266 5.91935 3.26472 8 3.26472Z" fill="#EB4335"/>
                    </svg>
                    Sign in with Google
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <div className="space-y-4">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGoogleLogin}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M15.5 8.13802C15.5 7.54583 15.4535 7.13364 15.3535 6.70947H8V9.27269H12.3206C12.2419 9.91987 11.7742 10.9282 10.7703 11.6052L10.7539 11.7133L13.0932 13.4997L13.25 13.5136C14.7419 12.1591 15.5 10.3182 15.5 8.13802Z" fill="#4285F4"/>
                      <path d="M8 15.5001C10.1387 15.5001 11.9419 14.8184 13.25 13.5137L10.7703 11.6053C10.0903 12.0766 9.17097 12.4012 8 12.4012C5.91935 12.4012 4.15161 11.0535 3.52581 9.19373L3.42258 9.2007L1.00323 11.0457L0.96774 11.1445C2.26774 13.7445 4.93871 15.5001 8 15.5001Z" fill="#34A853"/>
                      <path d="M3.52581 9.19366C3.36129 8.76949 3.26452 8.31033 3.26452 7.833C3.26452 7.35567 3.36129 6.8965 3.51935 6.47233L3.51452 6.35767L1.05548 4.47967L0.967739 4.52166C0.354839 5.52933 0 6.6465 0 7.833C0 9.0195 0.354839 10.1367 0.967739 11.1443L3.52581 9.19366Z" fill="#FBBC05"/>
                      <path d="M8 3.26472C9.48387 3.26472 10.4677 3.92389 11.0323 4.44822L13.2581 2.31389C11.9355 1.09672 10.1387 0.333008 8 0.333008C4.93871 0.333008 2.26774 2.08861 0.96774 4.6886L3.51935 6.47244C4.15161 4.61266 5.91935 3.26472 8 3.26472Z" fill="#EB4335"/>
                    </svg>
                    Sign up with Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-gray-500">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    className="text-royal hover:underline font-medium"
                    onClick={() => setActiveTab("register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    className="text-royal hover:underline font-medium"
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
      <EmailPopup />
    </>
  );
};

export default Auth;
