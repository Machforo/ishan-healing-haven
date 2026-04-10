import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, Users, Leaf, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const searchData = [
  { type: "Department", label: "Kayachikitsa (General Medicine)", path: "/departments/kayachikitsa", icon: Heart },
  { type: "Department", label: "Panchkarma OPD", path: "/departments/panchkarma-opd", icon: Leaf },
  { type: "Department", label: "Prasuti (Gynaecology)", path: "/departments/prasuti", icon: Heart },
  { type: "Department", label: "Shalakya (ENT & Eye)", path: "/departments/shalakya", icon: Eye },
  { type: "Department", label: "Kaumarabhritya (Paediatrics)", path: "/departments/kaumarabhritya", icon: Users },
  { type: "Department", label: "Yoga & Wellness", path: "/departments/yoga", icon: Leaf },
  { type: "Treatment", label: "Vamana Therapy", path: "/panchkarma/vamana", icon: Leaf },
  { type: "Treatment", label: "Virechana Therapy", path: "/panchkarma/virechana", icon: Leaf },
  { type: "Treatment", label: "Basti Therapy", path: "/panchkarma/basti", icon: Leaf },
  { type: "Treatment", label: "Nasya Therapy", path: "/panchkarma/nasya", icon: Leaf },
  { type: "Treatment", label: "Raktamokshana", path: "/panchkarma/raktamokshana", icon: Leaf },
  { type: "Doctor", label: "Dr. Anita Sharma – Kayachikitsa", path: "/doctors", icon: Users },
  { type: "Doctor", label: "Dr. Rajesh Kumar – Panchkarma", path: "/doctors", icon: Users },
  { type: "Doctor", label: "Dr. Priya Verma – Gynaecology", path: "/doctors", icon: Users },
  { type: "Doctor", label: "Dr. Meera Gupta – ENT & Eye", path: "/doctors", icon: Users },
  { type: "Page", label: "Book Appointment", path: "/appointment", icon: ArrowRight },
  { type: "Page", label: "Contact Us", path: "/contact", icon: ArrowRight },
  { type: "Page", label: "Patient FAQs", path: "/patient-services/faqs", icon: ArrowRight },
];

const typeColors: Record<string, string> = {
  Department: "bg-emerald-100 text-emerald-700",
  Treatment:  "bg-amber-100 text-amber-700",
  Doctor:     "bg-sky-100 text-sky-700",
  Page:       "bg-violet-100 text-violet-700",
};

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length > 1
    ? searchData.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search doctors, departments, treatments…"
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="py-2 max-h-[60vh] overflow-y-auto">
            {results.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i}>
                  <button
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/60 transition-colors text-left"
                    onClick={() => handleSelect(item.path)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-foreground/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{item.label}</div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : query.length > 1 ? (
          <div className="py-10 text-center text-muted-foreground text-sm">
            No results for &ldquo;<strong>{query}</strong>&rdquo;
          </div>
        ) : (
          <div className="py-6 px-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Links</p>
            <div className="flex flex-wrap gap-2">
              {["Panchkarma", "Doctors", "Departments", "Yoga", "Contact"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-primary/10 hover:text-primary border border-border transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-border flex items-center gap-4 text-[11px] text-muted-foreground">
          <span><kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">↵</kbd> to select</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
