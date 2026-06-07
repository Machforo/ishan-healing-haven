import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Clock, MapPin, ChevronDown, Search, CalendarCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import SearchOverlay from "@/components/SearchOverlay";
import { ConsultationModal } from "@/components/ConsultationModal";

const topBarItems = [
  { icon: Phone, text: "+91-XXXXX-XXXXX" },
  { icon: Clock, text: "OPD: Mon–Sat, 9–4 PM" },
  { icon: MapPin, text: "Greater Noida, UP" },
];

const navItems = [
  { label: "Home", path: "/", disabled: false },
  {
    label: "About", path: "/about", disabled: false,
    children: [
      { label: "Why Ishan Hospital?", path: "/about/why-ishan" },
      { label: "About Ishan Group", path: "/about/ishan-group" },
      { label: "Accreditations", path: "/about/accreditations" },
    ],
  },
  {
    label: "Departments", path: "/departments", disabled: false,
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
    label: "Panchkarma", path: "/panchkarma", disabled: false,
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
  { label: "Doctors", path: "/doctors", disabled: false },
  { label: "Services", path: "/patient-services", disabled: false },
  { label: "Contact", path: "/contact", disabled: false },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
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

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Fixed header wrapper ── */}
      <div className="fixed top-0 left-0 right-0 z-50">

        {/* Top info bar */}
        <div className="bg-primary text-primary-foreground hidden md:block">
          <div className="section-container flex justify-between items-center py-1.5">
            <div className="flex items-center gap-5">
              {topBarItems.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[11px]">
                  <item.icon className="w-3 h-3 opacity-80" />
                  {item.text}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[11px] opacity-70">
              <span className="cursor-not-allowed select-none">Patient Portal</span>
              <span className="cursor-not-allowed select-none">Careers</span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <header className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-border/60"
            : "bg-white border-border/30"
        }`}>
          <div className="section-container flex items-center justify-between h-[60px] lg:h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-4">
              <img
                src={logo}
                alt="Ishan Ayurvedic Hospital"
                className="h-9 lg:h-11 w-auto shrink-0"
              />
              <div className="leading-tight">
                <div className="font-serif text-[13px] lg:text-[15px] font-bold text-foreground">
                  Ishan Ayurvedic
                </div>
                <div className="text-[9px] lg:text-[10px] text-muted-foreground whitespace-nowrap">
                  Hospital & Panchkarma Centre
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center flex-1 justify-center">
              {navItems.map((item) =>
                item.disabled ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span
                      title="Coming soon"
                      className="flex items-center gap-0.5 px-2.5 py-1.5 text-[13px] font-medium text-foreground/35 cursor-not-allowed select-none whitespace-nowrap"
                    >
                      {item.label}
                      {item.children && <ChevronDown className="w-3 h-3" />}
                    </span>
                  </div>
                ) : (
                  <div key={item.label} className="relative">
                    <Link
                      to={item.path}
                      className={`flex items-center gap-0.5 px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap ${
                        location.pathname === item.path
                          ? "text-primary bg-primary/5"
                          : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {/* Search icon button */}
              <button
                onClick={() => setSearchOpen(true)}
                title="Search (Ctrl+K)"
                className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground/60 hover:text-primary"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* Book a Consultation — gradient CTA */}
              <button
                onClick={() => setConsultationOpen(true)}
                className="hidden lg:flex items-center gap-2 gradient-primary text-primary-foreground text-[13px] font-semibold px-4 py-2 rounded-xl shadow-soft hover:opacity-90 hover:scale-[1.03] active:scale-100 transition-all duration-200"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Consultation
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-border shadow-elevated animate-fade-in z-[60] max-h-[80vh] overflow-y-auto">
              <div className="section-container py-5 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.disabled ? (
                      <span className="block px-4 py-2.5 text-sm font-semibold text-foreground/30 cursor-not-allowed select-none rounded-lg">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile search */}
                <button
                  onClick={() => { setIsOpen(false); setSearchOpen(true); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-border"
                >
                  <Search className="w-4 h-4" />
                  Search doctors, departments…
                </button>

                {/* Divider */}
                <div className="pt-3 pb-1 border-t border-border mt-2">
                  <button
                    onClick={() => { setIsOpen(false); setConsultationOpen(true); }}
                    className="w-full py-3 text-sm font-bold gradient-primary text-primary-foreground rounded-xl shadow-soft flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book a Consultation
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>{/* end fixed header wrapper */}

      {/* Spacer:
          mobile → nav h-[60px]
          md     → topbar ~28px + nav 60px = ~88px  ≈ h-[88px]
          lg     → topbar ~28px + nav 68px = ~96px  ≈ h-24 */}
      <div className="h-[60px] md:h-[88px] lg:h-24" aria-hidden="true" />

      {/* Global search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Consultation modal */}
      <ConsultationModal open={consultationOpen} onOpenChange={setConsultationOpen} />
    </>
  );
};

export default Header;
