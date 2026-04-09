import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="tel:+91XXXXXXXXXX"
        className="group flex items-center gap-2 gradient-primary text-primary-foreground pl-4 pr-5 py-3 rounded-full shadow-elevated hover:scale-105 transition-all duration-300"
      >
        <Phone className="w-5 h-5 animate-pulse-slow" />
        <span className="text-sm font-semibold hidden sm:inline">Call Now</span>
      </a>
      <Link
        to="/appointment"
        className="group flex items-center gap-2 gradient-gold text-foreground pl-4 pr-5 py-3 rounded-full shadow-gold hover:scale-105 transition-all duration-300"
      >
        <Calendar className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">Book Appointment</span>
      </Link>
    </div>
  );
};

export default FloatingCTA;
