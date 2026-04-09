import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
      <a
        href="tel:+91XXXXXXXXXX"
        className="group flex items-center justify-center sm:justify-start gap-2 gradient-primary text-primary-foreground p-3 sm:pl-4 sm:pr-5 rounded-full shadow-elevated hover:scale-110 transition-all duration-300"
        aria-label="Call Emergency"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-slow" />
        <span className="text-sm font-bold hidden sm:inline">Call Now</span>
      </a>
      <Link
        to="/appointment"
        className="group flex items-center justify-center sm:justify-start gap-2 gradient-gold text-foreground p-3 sm:pl-4 sm:pr-5 rounded-full shadow-gold hover:scale-110 transition-all duration-300 border border-gold-light/20"
        aria-label="Book Appointment"
      >
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-sm font-bold hidden sm:inline">Book Appointment</span>
      </Link>
    </div>
  );
};

export default FloatingCTA;
