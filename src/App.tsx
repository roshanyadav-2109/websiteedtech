
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
