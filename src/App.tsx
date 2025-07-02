
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
import ExamPreparation from "./pages/ExamPreparation";
import JEEPrep from "./pages/JEEPrep";
import NEETPrep from "./pages/NEETPrep";
import IITMBSPrep from "./pages/IITMBSPrep";
import Career from "./pages/Career";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import GoogleCallback from "./pages/GoogleCallback";
import StudentGoogleCallback from "./pages/StudentGoogleCallback";
import AdminGoogleCallback from "./pages/AdminGoogleCallback";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import ProfileComplete from "./pages/ProfileComplete";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EmployeeVerification from "./pages/EmployeeVerification";
import InternVerification from "./pages/InternVerification";
import DistinguishedRecomendees from "./pages/DistinguishedRecomendees";
import CGPACalculator from "./pages/CGPACalculator";

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
              <Route path="/exam-preparation" element={<ExamPreparation />} />
              <Route path="/exam-preparation/jee" element={<JEEPrep />} />
              <Route path="/exam-preparation/neet" element={<NEETPrep />} />
              <Route path="/exam-preparation/iitm-bs" element={<IITMBSPrep />} />
              <Route path="/career" element={<Career />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/auth/callback" element={<GoogleCallback />} />
              <Route path="/auth/student/callback" element={<StudentGoogleCallback />} />
              <Route path="/auth/admin/callback" element={<AdminGoogleCallback />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/profile-complete" element={<ProfileComplete />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/employee-verification" element={<EmployeeVerification />} />
              <Route path="/intern-verification" element={<InternVerification />} />
              <Route path="/distinguished-recommendees" element={<DistinguishedRecomendees />} />
              <Route path="/cgpa-calculator" element={<CGPACalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BackendIntegratedWrapper>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
