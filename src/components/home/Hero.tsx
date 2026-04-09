import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Award } from "lucide-react";
import heroImg from "@/assets/hero-hospital.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Ishan Ayurvedic Hospital" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="section-container relative z-10 py-12 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-slide-up">
            <Shield className="w-4 h-4" />
            NCISM Approved Teaching Hospital
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Holistic Healing Through{" "}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">Ancient Ayurveda</span>
          </h1>

          <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed mb-6 sm:mb-8 max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Experience authentic Panchkarma treatments and expert Ayurvedic care at Greater Noida&apos;s premier teaching hospital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/appointment">
              <Button variant="gold" size="lg" className="w-full sm:w-auto text-base px-8 py-6">
                Book Appointment
              </Button>
            </Link>
            <Link to="/departments">
              <Button variant="outline-primary" size="lg" className="w-full sm:w-auto text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Explore Departments
              </Button>
            </Link>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Clock, label: "OPD Hours", value: "Mon–Sat, 9 AM – 4 PM" },
              { icon: Award, label: "Experience", value: "30+ Years of Trust" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass-card rounded-lg px-4 py-3 sm:py-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full gradient-gold flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs text-primary-foreground/60 uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm sm:text-base font-semibold text-primary-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
