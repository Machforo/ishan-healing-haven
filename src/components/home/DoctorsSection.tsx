import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, Search, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/ConsultationModal";
import { useHospitalData } from "@/hooks/useHospitalData";

interface DoctorType {
  name: string;
  speciality?: string;
  designation?: string;
  category?: string;
  department?: string;
  experience?: string;
  qualifications?: string;
  days?: string;
  image?: string;
  avatar?: string;
}

const defaultDoctors: DoctorType[] = [];

const categories = ["All", "Medicine", "Therapy", "Surgery"];

const availabilityDays = ["All Days", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DoctorsSection = () => {
  const { data } = useHospitalData("doctors");
  const { data: homeData } = useHospitalData("homepage");

  // Handle various api response shapes for doctors list
  let doctors: DoctorType[] = defaultDoctors;
  if (Array.isArray(data) && data.length > 0) {
    doctors = data;
  } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    doctors = data.data;
  } else if (data?.doctors && Array.isArray(data.doctors) && data.doctors.length > 0) {
    doctors = data.doctors;
  }

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDay, setActiveDay] = useState("All Days");
  const [query, setQuery] = useState("");

  const filtered = doctors.filter((d: any) => {
    const matchCat  = activeCategory === "All" || d.category === activeCategory || d.department === activeCategory;
    const matchDay  = activeDay === "All Days" || (d.days && d.days.includes(activeDay)) || !d.days;
    const matchQ    = query.trim() === "" ||
      (d.name && d.name.toLowerCase().includes(query.toLowerCase())) ||
      (d.speciality && d.speciality.toLowerCase().includes(query.toLowerCase())) ||
      (d.department && d.department.toLowerCase().includes(query.toLowerCase())) ||
      (d.designation && d.designation.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchDay && matchQ;
  });

  return (
    <section className="py-14 sm:py-20 bg-muted/50">
      <ConsultationModal 
        open={!!selectedDoctor} 
        onOpenChange={(open) => !open && setSelectedDoctor(null)} 
        doctorName={selectedDoctor || undefined}
      />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {homeData?.doctorsSubheading || "Expert Care"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {homeData?.doctorsHeading || "Meet Our Ayurvedic Doctors"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {homeData?.doctorsDescription || "Our team of qualified Ayurvedic physicians brings decades of clinical experience and deep knowledge of classical texts."}
            </p>
          </div>
        </ScrollReveal>

        {/* Filters row */}
        <ScrollReveal delay={80}>
          <div className="flex flex-col gap-3 mb-8">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search doctors or speciality…"
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter pills row */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Specialty filters */}
              <span className="text-xs text-muted-foreground font-medium mr-1">Speciality:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs rounded-full font-medium border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}

              {/* Divider */}
              <span className="w-px h-5 bg-border mx-1" />

              {/* Day availability filters */}
              <span className="text-xs text-muted-foreground font-medium mr-1">Available:</span>
              {availabilityDays.map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3.5 py-1.5 text-xs rounded-full font-medium border transition-all duration-200 ${
                    activeDay === day
                      ? "bg-accent text-foreground border-accent shadow-soft"
                      : "bg-card text-foreground/70 border-border hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {day}
                </button>
              ))}

              {/* Clear all */}
              {(activeCategory !== "All" || activeDay !== "All Days" || query) && (
                <button
                  onClick={() => { setActiveCategory("All"); setActiveDay("All Days"); setQuery(""); }}
                  className="ml-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2"
                >
                  <X className="w-3.5 h-3.5" /> Clear all
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {doctors.length} doctors
            </p>
          </div>
        </ScrollReveal>

        {/* Doctor cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, i) => (
              <ScrollReveal key={doc.name} delay={i * 80}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group hover:-translate-y-1 border border-border/50">
                  {/* Photo */}
                  <div className="h-64 overflow-hidden relative bg-muted">
                    <img 
                      src={doc.image || doc.avatar} 
                      alt={doc.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name || "Doctor")}&size=400&background=145428&color=fff&font-size=0.4`;
                      }}
                    />
                    {/* Category badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground shadow-sm backdrop-blur-sm">
                        {doc.category || doc.department || doc.speciality || "Consultant"}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{doc.speciality || doc.designation}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.experience ? `${doc.experience} experience` : doc.qualifications}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                      <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                      OPD: <span className="font-medium text-foreground/80">{doc.days || "Mon-Sat"}</span>
                    </div>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="w-full mt-4 font-semibold"
                      onClick={() => setSelectedDoctor(doc.name)}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No doctors match your filter.</p>
            <button
              onClick={() => { setActiveCategory("All"); setActiveDay("All Days"); setQuery(""); }}
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

export default DoctorsSection;
