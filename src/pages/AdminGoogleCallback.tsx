
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminGoogleCallback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          const email = data.session.user.email;
          
          if (email === "help.unknowniitians@gmail.com") {
            toast({
              title: "Admin login successful!",
              description: "Redirecting to admin dashboard...",
            });
            navigate("/admin/dashboard");
          } else {
            // Non-admin user
            await supabase.auth.signOut();
            toast({
              title: "Access Denied",
              description: "You don't have admin privileges",
              variant: "destructive",
            });
            navigate("/admin");
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
        navigate("/admin");
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
        <p className="text-gray-600">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
};

export default AdminGoogleCallback;
