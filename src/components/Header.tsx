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
  { label: "Home", path: "/" },
  {
    label: "About", path: "/about",
    children: [
      { label: "Why Ishan Hospital?", path: "/about/why-ishan" },
      { label: "About Ishan Group", path: "/about/ishan-group" },
      { label: "Accreditations", path: "/about/accreditations" },
    ],
  },
  {
    label: "Departments", path: "/departments",
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
    label: "Panchkarma", path: "/panchkarma",
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
  { label: "Our Doctors", path: "/doctors" },
  { label: "Patient Services", path: "/patient-services" },
  { label: "Contact", path: "/contact" },
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
            <Link to="/patient-portal" className="hover:underline">Patient Portal</Link>
            <Link to="/careers" className="hover:underline">Careers</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-lg shadow-soft" : "bg-card"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ishan Ayurvedic Hospital" className="h-12 lg:h-14 w-auto" />
            <div className="hidden sm:block">
              <div className="font-serif text-lg font-bold text-foreground leading-tight">Ishan Ayurvedic</div>
              <div className="text-xs text-muted-foreground">Hospital & Panchkarma Centre</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
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
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-lg shadow-elevated border border-border p-2 animate-scale-in z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-3 py-2 text-sm rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/appointment">
              <Button variant="hero" size="sm" className="hidden sm:inline-flex">
                Book Appointment
              </Button>
            </Link>
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
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="section-container py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    className="block px-4 py-3 text-sm font-medium rounded-md hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/appointment" className="block px-4 pt-2">
                <Button variant="hero" className="w-full">Book Appointment</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
