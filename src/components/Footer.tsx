import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";
import { useHospitalData } from "@/hooks/useHospitalData";

// disabled: true = temporarily hidden (will be re-enabled when pages are ready)
const quickLinks = [
  { label: "Home", path: "/", disabled: false },
  { label: "About", path: "/about/why-ishan", disabled: false },
  { label: "Our Doctors", path: "/doctors", disabled: false },
  { label: "Departments", path: "/departments", disabled: false },
  { label: "Panchkarma", path: "/panchkarma", disabled: false },
  { label: "Book Appointment", path: "/appointment", disabled: false },
];

const patientLinks = [
  { label: "OPD Schedule", path: "/patient-services/opd-schedule", disabled: false },
  { label: "Patient FAQs", path: "/patient-services/faqs", disabled: false },
  { label: "Health Blog", path: "/patient-services/blog", disabled: false },
  { label: "Downloads", path: "/downloads", disabled: false },
  { label: "Patient Feedback", path: "/feedback", disabled: false },
  { label: "Patient Portal", path: "/patient-portal", disabled: false },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy", disabled: false },
  { label: "Anti-Ragging", path: "/anti-ragging", disabled: false },
  { label: "Grievance Redressal", path: "/grievance", disabled: false },
  { label: "PoSH Policy", path: "/posh-policy", disabled: false },
  { label: "Disclosure & Licensing", path: "/disclosure", disabled: false },
];

const Footer = () => {
  const { data } = useHospitalData("homepage");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Banner */}
      <div className="gradient-gold py-12 sm:py-16">
        <div className="section-container text-center">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
            {data?.footerCtaHeading || "Experience the Healing Power of Ayurveda"}
          </h3>
          <p className="text-sm sm:text-base text-foreground/80 mb-8 max-w-xl mx-auto px-4">
            {data?.footerCtaSubtext || "Fill out the enquiry form above and take the first step towards holistic wellness."}
          </p>
          <Link to="/appointment">
            <button
              className="inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-bold shadow-soft hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto overflow-hidden text-sm sm:text-base cursor-pointer"
            >
              {data?.footerCtaBtnText || "Book Appointment"}
            </button>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-5">
            <img src={logo} alt="Ishan" className="h-12 sm:h-14 w-auto brightness-200" />
            <div>
              <div className="font-serif text-base sm:text-lg font-bold">Ishan Ayurvedic</div>
              <div className="text-[10px] sm:text-xs text-primary-foreground/60 whitespace-nowrap">Hospital & Panchkarma Centre</div>
            </div>
          </Link>
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5">
            {data?.footerDescription || "NCISM-approved teaching hospital providing authentic Ayurvedic treatments and Panchkarma therapies in Greater Noida."}
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, url: data?.facebookUrl },
              { Icon: Instagram, url: data?.instagramUrl },
              { Icon: Youtube, url: data?.youtubeUrl }
            ].map((item, i) => (
              <a
                key={i}
                href={item.url || "#"}
                target={item.url ? "_blank" : undefined}
                rel={item.url ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Social Link"
              >
                <item.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
 
        <div>
          <h4 className="font-serif text-lg font-semibold mb-5 pb-2 border-b border-primary-foreground/10 sm:border-0">Quick Links</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
            {(data?.quickLinks?.length > 0 ? data.quickLinks : quickLinks).map((link: any) => (
              <li key={link.path}>
                {link.disabled ? (
                  <span className="text-sm text-primary-foreground/35 cursor-not-allowed select-none">{link.label}</span>
                ) : (
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
 
        <div>
          <h4 className="font-serif text-lg font-semibold mb-5 pb-2 border-b border-primary-foreground/10 sm:border-0">Patient Services</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
            {(data?.patientLinks?.length > 0 ? data.patientLinks : patientLinks).map((link: any) => (
              <li key={link.path}>
                {link.disabled ? (
                  <span className="text-sm text-primary-foreground/35 cursor-not-allowed select-none">{link.label}</span>
                ) : (
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
 
        <div>
          <h4 className="font-serif text-lg font-semibold mb-5 pb-2 border-b border-primary-foreground/10 sm:border-0">Contact Us</h4>
          <div className="space-y-4 text-sm text-primary-foreground/70">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{data?.contactAddress || "Ishan Campus, Greater Noida, Gautam Buddh Nagar, UP – 201310"}</span>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span>{data?.contactPhone || "+91-9582761166"}</span>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <span>{data?.contactEmail || "hospital@ishan.ac"}</span>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <span>OPD: {data?.opdHours || "Mon–Sat, 9:00 AM – 4:00 PM"}</span>
            </div>
          </div>
        </div>
      </div>
 
      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] sm:text-xs text-primary-foreground/50 text-center md:text-left order-2 md:order-1">
            © {new Date().getFullYear()} Ishan Ayurvedic Hospital. All rights reserved. Part of Ishan Educational Institutions.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2">
            {(data?.legalLinks?.length > 0 ? data.legalLinks : legalLinks).map((link: any) => (
              <span key={link.path} className="text-[10px] sm:text-xs text-primary-foreground/30 cursor-not-allowed select-none whitespace-nowrap">
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top — anchored bottom-left so it never overlaps the FloatingCTA */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
