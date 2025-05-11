
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const StudentGoogleCallback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          // Check if profile is complete
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', data.session.user.id)
            .single();
          
          toast({
            title: "Login successful!",
            description: "Welcome!",
          });
          
          if (!profile || !profile.full_name || !profile.phone) {
            navigate("/profile/complete");
          } else {
            navigate("/");
          }
        } else {
          throw new Error("No session found");
        }
      } catch (error: any) {
        toast({
          title: "Authentication failed",
          description: error.message || "An error occurred during authentication",
          variant: "destructive",
        });
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your Google sign-in</p>
      </div>
    </div>
  );
};

export default StudentGoogleCallback;
