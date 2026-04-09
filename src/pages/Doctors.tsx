import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "@/components/ConsultationModal";

const allDoctors = [
  { 
    name: "Dr. Anita Sharma", 
    dept: "Kayachikitsa", 
    qual: "MD (Ayurveda) – General Medicine", 
    exp: "15+ years", 
    days: "Mon, Wed, Fri", 
    bio: "Specialises in diabetes, arthritis, and chronic digestive disorders through Ayurvedic management.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Rajesh Kumar", 
    dept: "Panchkarma", 
    qual: "MD (Panchkarma)", 
    exp: "12+ years", 
    days: "Mon–Sat", 
    bio: "Expert in classical Panchkarma therapies including Vamana, Virechana, and Basti treatments.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Priya Verma", 
    dept: "Prasuti Tantra", 
    qual: "MS (Ayurveda) – Gynaecology", 
    exp: "10+ years", 
    days: "Tue, Thu, Sat", 
    bio: "Specialises in PCOS, menstrual disorders, antenatal care, and Garbhini Paricharya.",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Suresh Yadav", 
    dept: "Shalya Tantra", 
    qual: "MS (Ayurveda) – Surgery", 
    exp: "18+ years", 
    days: "Mon, Wed, Fri", 
    bio: "Pioneer in Ksharasutra therapy for fistula and piles; expert in Agnikarma procedures.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Meera Gupta", 
    dept: "Shalakya Tantra", 
    qual: "MS (Ayurveda) – ENT & Eye", 
    exp: "8+ years", 
    days: "Tue, Thu", 
    bio: "Treats sinusitis, hearing disorders, myopia, and conjunctivitis with Ayurvedic approaches.",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Vikram Singh", 
    dept: "Kaumarabhritya", 
    qual: "MD (Ayurveda) – Paediatrics", 
    exp: "11+ years", 
    days: "Mon–Fri", 
    bio: "Child health specialist focusing on immunity, growth disorders, and childhood ailments.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Kavita Rao", 
    dept: "Yoga & Wellness", 
    qual: "MD (Yoga & Rehabilitation)", 
    exp: "9+ years", 
    days: "Mon–Sat", 
    bio: "Therapeutic yoga for stress, anxiety, lifestyle disorders, and chronic pain management.",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400"
  },
  { 
    name: "Dr. Alok Mishra", 
    dept: "Pathology", 
    qual: "MD (Pathology)", 
    exp: "14+ years", 
    days: "Mon–Sat", 
    bio: "Heads the diagnostics lab providing accurate blood, urine, and clinical analysis.",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36ae04?auto=format&fit=crop&q=80&w=400"
  },
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <Layout>
      <ConsultationModal 
        open={!!selectedDoctor} 
        onOpenChange={(open) => !open && setSelectedDoctor(null)} 
        doctorName={selectedDoctor || undefined}
      />
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Medical Team
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Qualified MD/MS Ayurveda practitioners with extensive clinical experience.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allDoctors.map((doc, i) => (
              <ScrollReveal key={doc.name} delay={i * 80}>
                <div className="bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 flex">
                  <div className="w-40 overflow-hidden shrink-0">
                    <img 
                      src={doc.image} 
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium">{doc.dept}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.qual} · {doc.exp}</p>
                    <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{doc.bio}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" /> {doc.days}
                      </span>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setSelectedDoctor(doc.name)}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Doctors;
