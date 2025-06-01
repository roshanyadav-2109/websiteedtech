
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface EnrollButtonProps {
  courseId?: string;
  enrollmentLink?: string;
  className?: string;
  children?: React.ReactNode;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({ 
  courseId, 
  enrollmentLink, 
  className = "", 
  children = "Enroll Now" 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEnroll = () => {
    if (isAuthenticated === false) {
      localStorage.setItem('authRedirectUrl', window.location.pathname);
      window.location.href = '/auth';
      return;
    }

    if (enrollmentLink) {
      window.open(enrollmentLink, '_blank');
    } else {
      // Fallback for existing courses without enrollment links
      console.log('Enrolling in course:', courseId);
    }
  };

  return (
    <Button 
      onClick={handleEnroll}
      className={className}
    >
      {children}
    </Button>
  );
};

export default EnrollButton;
