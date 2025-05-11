
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Courses from "./pages/Courses";
import ExamPreparation from "./pages/ExamPreparation";
import NEETPrep from "./pages/NEETPrep";
import JEEPrep from "./pages/JEEPrep";
import IITMBSPrep from "./pages/IITMBSPrep";
import Career from "./pages/Career";
import InternVerification from "./pages/InternVerification";
import AdminLogin from "./pages/AdminLogin";
import AdminGoogleCallback from "./pages/AdminGoogleCallback";
import AdminDashboard from "./pages/AdminDashboard";
import StudentLogin from "./pages/StudentLogin";
import StudentGoogleCallback from "./pages/StudentGoogleCallback";
import ProfileComplete from "./pages/ProfileComplete";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  // Protected route component for admin
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div>Loading...</div>;
    
    if (!session) {
      return <Navigate to="/admin" />;
    }

    if (session.user.email !== "help.unknowniitians@gmail.com") {
      return <Navigate to="/admin" />;
    }
    
    return <>{children}</>;
  };

  // Protected route component for students
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div>Loading...</div>;
    
    if (!session) {
      return <Navigate to="/auth" />;
    }
    
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/exam-preparation" element={<ExamPreparation />} />
            <Route path="/exam-preparation/neet" element={<NEETPrep />} />
            <Route path="/exam-preparation/jee" element={<JEEPrep />} />
            <Route path="/exam-preparation/iitm-bs" element={<IITMBSPrep />} />
            <Route path="/career" element={<Career />} />
            <Route path="/intern-verification" element={<InternVerification />} />
            
            {/* Student Authentication Routes */}
            <Route path="/auth" element={<StudentLogin />} />
            <Route path="/auth/google-callback" element={<StudentGoogleCallback />} />
            <Route 
              path="/profile/complete" 
              element={
                <AuthRoute>
                  <ProfileComplete />
                </AuthRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/google-callback" element={<AdminGoogleCallback />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
