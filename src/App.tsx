
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { BackendIntegratedWrapper } from "@/components/BackendIntegratedWrapper";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Auth from "./pages/Auth";
import GoogleCallback from "./pages/GoogleCallback";
import StudentGoogleCallback from "./pages/StudentGoogleCallback";
import StudentLogin from "./pages/StudentLogin";
import ProfileComplete from "./pages/ProfileComplete";
import Dashboard from "./pages/Dashboard";
import ExamPreparation from "./pages/ExamPreparation";
import JEEPrep from "./pages/JEEPrep";
import NEETPrep from "./pages/NEETPrep";
import IITMBSPrep from "./pages/IITMBSPrep";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EmployeeVerification from "./pages/EmployeeVerification";
import InternVerification from "./pages/InternVerification";

// Admin routes
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGoogleCallback from "./pages/AdminGoogleCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BackendIntegratedWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<GoogleCallback />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/auth/callback" element={<StudentGoogleCallback />} />
              <Route path="/profile/complete" element={<ProfileComplete />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exam-preparation" element={<ExamPreparation />} />
              
              {/* Exam preparation pages with correct paths */}
              <Route path="/jee-prep" element={<JEEPrep />} />
              <Route path="/neet-prep" element={<NEETPrep />} />
              <Route path="/iitm-bs-prep" element={<IITMBSPrep />} />
              
              <Route path="/career" element={<Career />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/employee-verification" element={<EmployeeVerification />} />
              <Route path="/intern-verification" element={<InternVerification />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/auth/callback" element={<AdminGoogleCallback />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BackendIntegratedWrapper>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
