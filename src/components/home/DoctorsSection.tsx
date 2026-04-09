import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "@/components/ConsultationModal";

const doctors = [
  { 
    name: "Dr. Anita Sharma", 
    speciality: "Kayachikitsa (General Medicine)", 
    experience: "15+ years", 
    days: "Mon, Wed, Fri",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Rajesh Kumar", 
    speciality: "Panchkarma Specialist", 
    experience: "12+ years", 
    days: "Mon–Sat",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Priya Verma", 
    speciality: "Prasuti Tantra (Gynaecology)", 
    experience: "10+ years", 
    days: "Tue, Thu, Sat",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Suresh Yadav", 
    speciality: "Shalya Tantra (Surgery)", 
    experience: "18+ years", 
    days: "Mon, Wed, Fri",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Meera Gupta", 
    speciality: "Shalakya (ENT & Eye)", 
    experience: "8+ years", 
    days: "Tue, Thu",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Vikram Singh", 
    speciality: "Kaumarabhritya (Paediatrics)", 
    experience: "11+ years", 
    days: "Mon–Fri",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  },
];

const DoctorsSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <section className="py-12 sm:py-20 bg-muted/50">
      <ConsultationModal 
        open={!!selectedDoctor} 
        onOpenChange={(open) => !open && setSelectedDoctor(null)} 
        doctorName={selectedDoctor || undefined}
      />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Expert Care</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Meet Our Ayurvedic Doctors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of qualified Ayurvedic physicians brings decades of clinical experience and deep knowledge of classical texts.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc, i) => (
            <ScrollReveal key={doc.name} delay={i * 100}>
              <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group hover:-translate-y-1 border border-border/50">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={doc.image} 
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{doc.speciality}</p>
                  <p className="text-xs text-muted-foreground mt-1">{doc.experience} experience</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    OPD: {doc.days}
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => setSelectedDoctor(doc.name)}
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/doctors">
            <Button variant="hero" size="lg">View All Doctors</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
