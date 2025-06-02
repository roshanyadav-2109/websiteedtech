
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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
import Auth from "./pages/Auth";
import GoogleCallback from "./pages/GoogleCallback";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Authentication Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/google-callback" element={<GoogleCallback />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
