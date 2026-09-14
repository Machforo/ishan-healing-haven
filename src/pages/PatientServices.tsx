import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Stethoscope, BookOpen, HelpCircle, User } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";
import DynamicPageSections from "@/components/DynamicPageSections";

const iconMap: Record<string, any> = {
  Calendar,
  FileText,
  Stethoscope,
  BookOpen,
  HelpCircle,
  User,
};

const PatientServices = () => {
  const { data } = useHospitalData("services");

  const title = data?.title || "Patient Services";
  const description = data?.description || "Everything you need for a seamless healthcare experience at Ishan Ayurvedic Hospital.";
  const list = data?.servicesList || [];

  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            Holistic Patient Services
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {description}
          </p>
        </div>
      </section>
    ),
    serviceList: (
      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((s: any, i: number) => {
              const Icon = iconMap[s.icon] || HelpCircle;
              return (
                <ScrollReveal key={s.name || i} delay={i * 80}>
                  <Link to={s.path} className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc || s.description}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all pt-3 mt-4 border-t border-border/40">
                      Learn More →
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    ),
    specialCare: (
      <section className="py-14 bg-muted/40 border-y border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              In-Patient Care & Residential Recovery
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Comprehensive 24/7 nursing and Vaidya care for patients requiring intensive Panchakarma or surgical convalescence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Private & Semi-Private Rooms</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Air-conditioned, hygienic, patient-first accommodations with attendant facilities and Sattvic meals.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Round-the-Clock Nursing</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dedicated nursing staff trained in traditional Ayurvedic wound care, herbal dressing, and patient care.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Yoga & Physiotherapy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Daily therapeutic Yoga sessions, Pranayama routines, and guided mobility exercises for rehab.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    pharmacyLab: (
      <section className="py-14 sm:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">Quality Assured</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                24x7 In-House Pharmacy & Clinical Diagnostics
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Our in-house pharmacy stocks over 500 classical formulations, fresh Kwatha decoctions, and single-herb extracts sourced directly from licensed GMP-certified Ayurvedic pharmacies. Supported by modern blood, urine, and biochemical pathology tests.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-muted/60 rounded-xl">
                  <div className="font-bold text-foreground text-sm">GMP Certified</div>
                  <div className="text-xs text-muted-foreground">Standardized herbs</div>
                </div>
                <div className="p-3.5 bg-muted/60 rounded-xl">
                  <div className="font-bold text-foreground text-sm">Same-Day Reports</div>
                  <div className="text-xs text-muted-foreground">Pathology tests</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/50">
              <img 
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80" 
                alt="Ayurvedic Pharmacy" 
                className="w-full h-80 object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
    ),
    cta: (
      <section className="pb-16 pt-4">
        <div className="section-container text-center">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center shadow-elevated">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              Need Assistance with Patient Care Services?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm sm:text-base mb-6">
              Our patient care coordinator will guide you through admissions, bed availability, and treatment packages.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/appointment">
                <Button variant="gold" size="lg" className="font-bold shadow-md">Book an Appointment</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/60 hover:bg-white hover:text-primary">
                  Contact Helpdesk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "serviceList", "specialCare", "pharmacyLab", "cta"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="services"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default PatientServices;
