import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import Index from "./pages/Index";
import { ConsultationModal, useTimedConsultationPopup } from "./components/ConsultationModal";
import WhyIshan from "./pages/WhyIshan";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentDetail from "./pages/DepartmentDetail";
import PanchkarmaDetail from "./pages/PanchkarmaDetail";
import PatientServices from "./pages/PatientServices";
import DynamicPageRenderer from "./components/DynamicPageRenderer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const { isOpen, setIsOpen } = useTimedConsultationPopup();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConsultationModal open={isOpen} onOpenChange={setIsOpen} />
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* ── ACTIVE PAGE ── */}
              <Route path="/" element={<Index />} />

              {/* ── TEMPORARILY HIDDEN — redirect all other routes to home ── */}
              {/* To restore a page: replace its <Navigate> with the real element */}
              <Route path="/about/*" element={<WhyIshan />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/departments/:slug" element={<DepartmentDetail />} />
              <Route path="/panchkarma" element={<PanchkarmaDetail />} />
              <Route path="/panchkarma/:slug" element={<PanchkarmaDetail />} />
              <Route path="/patient-services" element={<PatientServices />} />
              <Route path="/patient-services/*" element={<PatientServices />} />
              <Route path="/patient-portal" element={<Navigate to="/" replace />} />
              <Route path="/careers" element={<Navigate to="/" replace />} />
              <Route path="/feedback" element={<Navigate to="/" replace />} />
              <Route path="/downloads" element={<Navigate to="/" replace />} />
              <Route path="/disclosure" element={<Navigate to="/" replace />} />
              <Route path="/privacy-policy" element={<Navigate to="/" replace />} />
              <Route path="/anti-ragging" element={<Navigate to="/" replace />} />
              <Route path="/grievance" element={<Navigate to="/" replace />} />
              <Route path="/posh-policy" element={<Navigate to="/" replace />} />
              <Route path="/p/:slug" element={<DynamicPageRenderer portal="hospital" />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
