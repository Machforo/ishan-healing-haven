import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const topBarItems = [
  { icon: Phone, text: "Emergency: +91-XXXXX-XXXXX" },
  { icon: Clock, text: "OPD: Mon–Sat, 9 AM – 4 PM" },
  { icon: MapPin, text: "Greater Noida, UP" },
];

const navItems = [
  { label: "Home", path: "/", disabled: false },
  {
    label: "About", path: "/about", disabled: true,
    children: [
      { label: "Why Ishan Hospital?", path: "/about/why-ishan" },
      { label: "About Ishan Group", path: "/about/ishan-group" },
      { label: "Accreditations", path: "/about/accreditations" },
    ],
  },
  {
    label: "Departments", path: "/departments", disabled: true,
    children: [
      { label: "Kayachikitsa (General Medicine)", path: "/departments/kayachikitsa" },
      { label: "Panchkarma OPD", path: "/departments/panchkarma-opd" },
      { label: "Prasuti (Gynaecology)", path: "/departments/prasuti" },
      { label: "Kaumarabhritya (Paediatrics)", path: "/departments/kaumarabhritya" },
      { label: "Shalakya (ENT & Eye)", path: "/departments/shalakya" },
      { label: "Shalya (Surgery)", path: "/departments/shalya" },
      { label: "Yoga & Wellness", path: "/departments/yoga" },
      { label: "Pathology & Diagnostics", path: "/departments/pathology" },
      { label: "Pharmacy / Dispensary", path: "/departments/pharmacy" },
    ],
  },
  {
    label: "Panchkarma", path: "/panchkarma", disabled: true,
    children: [
      { label: "Overview", path: "/panchkarma" },
      { label: "Vamana", path: "/panchkarma/vamana" },
      { label: "Virechana", path: "/panchkarma/virechana" },
      { label: "Basti", path: "/panchkarma/basti" },
      { label: "Nasya", path: "/panchkarma/nasya" },
      { label: "Raktamokshana", path: "/panchkarma/raktamokshana" },
      { label: "Other Therapies", path: "/panchkarma/other" },
    ],
  },
  { label: "Our Doctors", path: "/doctors", disabled: true },
  { label: "Patient Services", path: "/patient-services", disabled: true },
  { label: "Contact", path: "/contact", disabled: true },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Fixed header wrapper — keeps top bar + nav pinned while scrolling */}
      <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 hidden md:block">
        <div className="section-container flex justify-between items-center">
          <div className="flex gap-6">
            {topBarItems.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <item.icon className="w-3.5 h-3.5" />
                {item.text}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {/* Temporarily disabled */}
            <span className="opacity-50 cursor-not-allowed select-none">Patient Portal</span>
            <span className="opacity-50 cursor-not-allowed select-none">Careers</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-lg shadow-soft" : "bg-card"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="Ishan Ayurvedic Hospital" className="h-9 sm:h-12 lg:h-14 w-auto shrink-0" />
            <div>
              <div className="font-serif text-xs sm:text-base lg:text-lg font-bold text-foreground leading-tight">Ishan Ayurvedic</div>
              <div className="text-[9px] sm:text-xs text-muted-foreground whitespace-nowrap">Hospital & Panchkarma Centre</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.disabled ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {/* Non-clickable label — coming soon */}
                  <span
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-foreground/40 cursor-not-allowed select-none"
                    title="Coming soon"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </div>
              ) : (
                <div
                  key={item.label}
                  className="relative group"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/5"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Book Appointment button — temporarily disabled */}
            <button
              type="button"
              disabled
              className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-primary/40 text-primary-foreground/60 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed select-none"
              title="Coming soon"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-card border-t border-border shadow-elevated animate-fade-in z-[60] max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="section-container py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  {item.disabled ? (
                    <span className="block px-4 py-2 text-base font-semibold text-foreground/35 cursor-not-allowed select-none">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-4 py-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4 pb-2">
                <button
                  disabled
                  className="w-full py-4 text-base font-bold bg-primary/40 text-primary-foreground/60 rounded-lg cursor-not-allowed select-none"
                  title="Coming soon"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      </div>{/* end fixed header wrapper */}

      {/* Spacer to offset fixed header height:
          mobile  → nav only      = h-16 (64px)
          md      → topbar+nav-16 = h-24 (96px)
          lg      → topbar+nav-20 = h-28 (112px) */}
      <div className="h-16 md:h-24 lg:h-28" aria-hidden="true" />
    </>
  );
};

export default Header;
