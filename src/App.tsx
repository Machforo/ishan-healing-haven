import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const WhyIshan = lazy(() => import("./pages/WhyIshan"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Contact = lazy(() => import("./pages/Contact"));
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"));
const DepartmentDetail = lazy(() => import("./pages/DepartmentDetail"));
const PanchkarmaDetail = lazy(() => import("./pages/PanchkarmaDetail"));
const PatientServices = lazy(() => import("./pages/PatientServices"));
const PatientFAQs = lazy(() => import("./pages/PatientFAQs"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about/why-ishan" element={<WhyIshan />} />
            <Route path="/about/ishan-group" element={<WhyIshan />} />
            <Route path="/about/accreditations" element={<WhyIshan />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/:slug" element={<DepartmentDetail />} />
            <Route path="/panchkarma" element={<PanchkarmaDetail />} />
            <Route path="/panchkarma/:slug" element={<PanchkarmaDetail />} />
            <Route path="/patient-services" element={<PatientServices />} />
            <Route path="/patient-services/faqs" element={<PatientFAQs />} />
            {/* Placeholder routes for remaining pages */}
            <Route path="/patient-services/*" element={<PatientServices />} />
            <Route path="/patient-portal" element={<PatientServices />} />
            <Route path="/careers" element={<PatientServices />} />
            <Route path="/feedback" element={<Contact />} />
            <Route path="/downloads" element={<PatientServices />} />
            <Route path="/disclosure" element={<WhyIshan />} />
            <Route path="/privacy-policy" element={<PatientFAQs />} />
            <Route path="/anti-ragging" element={<PatientFAQs />} />
            <Route path="/grievance" element={<PatientFAQs />} />
            <Route path="/posh-policy" element={<PatientFAQs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
