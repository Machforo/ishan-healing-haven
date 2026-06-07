import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Leaf, Baby, Eye, Scissors, Dumbbell, FlaskConical, Pill, Heart, Search, X } from "lucide-react";

import { useHospitalData } from "@/hooks/useHospitalData";

const defaultDepartments = [
  { icon: Heart,       name: "Kayachikitsa",  subtitle: "General Medicine",         path: "/departments/kayachikitsa",   color: "from-emerald-500 to-emerald-700", category: "Medicine" },
  { icon: Leaf,        name: "Panchkarma",    subtitle: "Purification Therapy",      path: "/departments/panchkarma-opd", color: "from-amber-500 to-amber-700",    category: "Therapy" },
  { icon: Heart,       name: "Prasuti Tantra",subtitle: "Gynaecology & Maternity",  path: "/departments/prasuti",        color: "from-pink-500 to-pink-700",      category: "Medicine" },
  { icon: Baby,        name: "Kaumarabhritya",subtitle: "Paediatrics",               path: "/departments/kaumarabhritya", color: "from-sky-500 to-sky-700",        category: "Medicine" },
  { icon: Eye,         name: "Shalakya Tantra",subtitle: "ENT & Eye Care",           path: "/departments/shalakya",       color: "from-violet-500 to-violet-700",  category: "Surgery" },
  { icon: Scissors,    name: "Shalya Tantra", subtitle: "Ayurvedic Surgery",         path: "/departments/shalya",         color: "from-red-500 to-red-700",        category: "Surgery" },
  { icon: Dumbbell,    name: "Yoga & Wellness",subtitle: "Therapeutic Yoga",         path: "/departments/yoga",           color: "from-teal-500 to-teal-700",      category: "Therapy" },
  { icon: FlaskConical,name: "Pathology Lab", subtitle: "Diagnostics",               path: "/departments/pathology",      color: "from-indigo-500 to-indigo-700",  category: "Diagnostics" },
  { icon: Pill,        name: "Pharmacy",      subtitle: "Dispensary",               path: "/departments/pharmacy",       color: "from-orange-500 to-orange-700",  category: "Diagnostics" },
];

const categories = ["All", "Medicine", "Therapy", "Surgery", "Diagnostics"];

const Departments = () => {
  const { data } = useHospitalData("departments");
  const departmentsData = data?.length > 0 ? data : (data?.data?.length > 0 ? data.data : defaultDepartments);

  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = departmentsData.filter((d: any) => {
    const matchCat = activeFilter === "All" || d.category === activeFilter || !d.category;
    const matchQ   = query.trim() === "" ||
      (d.name && d.name.toLowerCase().includes(query.toLowerCase())) ||
      (d.subtitle && d.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      (d.description && d.description.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQ;
  });

  return (
    <section className="py-14 sm:py-20 bg-muted/40">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Our Specialities</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              9 OPD Departments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive Ayurvedic care across all major specialities, led by experienced practitioners.
            </p>
          </div>
        </ScrollReveal>

        {/* Search + Filter bar */}
        <ScrollReveal delay={80}>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-8">
            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search departments…"
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm rounded-full font-medium border transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((dept, i) => (
              <ScrollReveal key={dept.name} delay={i * 70}>
                {/* Temporarily non-navigating — disabled */}
                <div
                  className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color || 'from-emerald-500 to-emerald-700'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                      {dept.icon && typeof dept.icon !== 'string' ? <dept.icon className="w-6 h-6 text-white" /> : <Leaf className="w-6 h-6 text-white" />}
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                      {dept.category || 'Medicine'}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-snug">{dept.subtitle || dept.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary/50 select-none">
                    Coming soon <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No departments match your search.</p>
            <button
              onClick={() => { setQuery(""); setActiveFilter("All"); }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Departments;
