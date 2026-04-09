import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const doctors = [
  { name: "Dr. Anita Sharma", speciality: "Kayachikitsa (General Medicine)", experience: "15+ years", days: "Mon, Wed, Fri" },
  { name: "Dr. Rajesh Kumar", speciality: "Panchkarma Specialist", experience: "12+ years", days: "Mon–Sat" },
  { name: "Dr. Priya Verma", speciality: "Prasuti Tantra (Gynaecology)", experience: "10+ years", days: "Tue, Thu, Sat" },
  { name: "Dr. Suresh Yadav", speciality: "Shalya Tantra (Surgery)", experience: "18+ years", days: "Mon, Wed, Fri" },
  { name: "Dr. Meera Gupta", speciality: "Shalakya (ENT & Eye)", experience: "8+ years", days: "Tue, Thu" },
  { name: "Dr. Vikram Singh", speciality: "Kaumarabhritya (Paediatrics)", experience: "11+ years", days: "Mon–Fri" },
];

const DoctorsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Expert Care</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
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
                <div className="h-48 gradient-primary flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center text-3xl font-serif text-primary-foreground font-bold">
                    {doc.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{doc.speciality}</p>
                  <p className="text-xs text-muted-foreground mt-1">{doc.experience} experience</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    OPD: {doc.days}
                  </div>
                  <Link to="/appointment" className="mt-4 block">
                    <Button variant="outline-primary" size="sm" className="w-full">
                      Book Consultation
                    </Button>
                  </Link>
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
