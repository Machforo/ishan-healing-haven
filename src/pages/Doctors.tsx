import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "@/components/ConsultationModal";
import { useHospitalData } from "@/hooks/useHospitalData";
import DynamicPageSections from "@/components/DynamicPageSections";

interface DoctorType {
  name: string;
  dept?: string;
  department?: string;
  speciality?: string;
  qual?: string;
  qualifications?: string;
  exp?: string;
  experience?: string;
  days?: string;
  bio?: string;
  description?: string;
  image?: string;
  avatar?: string;
}

const defaultDoctors: DoctorType[] = [];

const Doctors = () => {
  const { data } = useHospitalData("doctors");
  const { data: homeData } = useHospitalData("homepage");

  let allDoctors: DoctorType[] = defaultDoctors;
  if (Array.isArray(data) && data.length > 0) {
    allDoctors = data;
  } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    allDoctors = data.data;
  } else if (data?.doctors && Array.isArray(data.doctors) && data.doctors.length > 0) {
    allDoctors = data.doctors;
  }

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [activeSpeciality, setActiveSpeciality] = useState<string>("All");

  const specialities = [
    "All",
    "Kayachikitsa",
    "Panchakarma",
    "Shalya Tantra",
    "Prasuti Tantra",
    "Kaumarbhritya",
    "Shalakya Tantra",
    "Swasthavritta"
  ];

  const filteredDoctors = activeSpeciality === "All"
    ? allDoctors
    : allDoctors.filter(d => 
        (d.dept && d.dept.toLowerCase().includes(activeSpeciality.toLowerCase())) ||
        (d.department && d.department.toLowerCase().includes(activeSpeciality.toLowerCase())) ||
        (d.speciality && d.speciality.toLowerCase().includes(activeSpeciality.toLowerCase()))
      );

  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            NCISM Certified Practitioners
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {homeData?.doctorsHeading || "Our Medical Team"}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {homeData?.doctorsDescription || "Distinguished MD/MS Ayurvedic consultants, professors, and surgeons dedicated to authentic holistic recovery."}
          </p>
        </div>
      </section>
    ),
    searchFilters: (
      <section className="py-8 bg-muted/40 border-b border-border/50">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-foreground">
              Filter by Clinical Speciality:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {specialities.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setActiveSpeciality(spec)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeSpeciality === spec
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background border border-border text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    doctorList: (
      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(filteredDoctors.length > 0 ? filteredDoctors : allDoctors).map((doc, i) => (
              <ScrollReveal key={doc.name || i} delay={i * 80}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 flex flex-col xs:flex-row group">
                  <div className="w-full xs:w-44 h-52 xs:h-auto overflow-hidden shrink-0 relative bg-muted">
                    <img 
                      src={doc.image || doc.avatar} 
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name || "Doctor")}&size=400&background=145428&color=fff&font-size=0.4`;
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white">
                      MD (Ayu)
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-primary font-semibold mt-0.5">
                        {doc.dept || doc.department || doc.speciality || "Senior Consultant"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.qual || doc.qualifications || "BAMS, MD (Ayurveda)"} · {doc.exp || doc.experience || "10+ Yrs Exp"}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/75 mt-3 leading-relaxed line-clamp-3">
                        {doc.bio || doc.description || "Providing specialised classical diagnosis, Nadi Pariksha, and personalized treatment regimens for chronic disorders."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-border/40">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/70 px-2.5 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {doc.days || "Mon-Sat (9 AM - 3 PM)"}
                      </span>
                      <Button 
                        variant="gold" 
                        size="sm"
                        className="h-8 px-4 text-xs font-bold rounded-lg shadow-sm hover:shadow"
                        onClick={() => setSelectedDoctor(doc.name)}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    ),
    opdSchedule: (
      <section className="py-14 bg-muted/30 border-y border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Weekly OPD & Consultation Schedule
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Out-Patient Departments operate daily from 9:00 AM to 4:00 PM with senior faculty doctors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card p-5 rounded-xl border border-border/50 shadow-soft text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold mb-3">
                OPD
              </div>
              <h4 className="font-serif font-bold text-base text-foreground mb-1">Morning Session</h4>
              <p className="text-xs text-muted-foreground mb-2">9:00 AM – 1:00 PM</p>
              <p className="text-xs text-foreground/70">General Medicine, Panchakarma Consultation, Women's Care & Nadi Pariksha</p>
            </div>
            <div className="bg-card p-5 rounded-xl border border-border/50 shadow-soft text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold mb-3">
                IPD
              </div>
              <h4 className="font-serif font-bold text-base text-foreground mb-1">Afternoon Clinical Rounds</h4>
              <p className="text-xs text-muted-foreground mb-2">1:30 PM – 4:00 PM</p>
              <p className="text-xs text-foreground/70">In-Patient rounds, Panchakarma therapy supervision & surgical dressings</p>
            </div>
            <div className="bg-card p-5 rounded-xl border border-border/50 shadow-soft text-center">
              <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold mb-3">
                24/7
              </div>
              <h4 className="font-serif font-bold text-base text-foreground mb-1">Emergency & Casualty</h4>
              <p className="text-xs text-muted-foreground mb-2">Round the Clock</p>
              <p className="text-xs text-foreground/70">Emergency medical officers, casualty staff, and ambulance service available 24x7</p>
            </div>
          </div>
        </div>
      </section>
    ),
    patientCareStandards: (
      <section className="py-14 sm:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 text-white font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="font-serif font-bold text-foreground text-lg mb-1.5">Evidence-Based Treatment</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every treatment integrates classical Samhita references with modern clinical diagnostic pathology.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 text-white font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="font-serif font-bold text-foreground text-lg mb-1.5">Authentic Panchakarma</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Therapies performed by trained technicians in dedicated sterile therapy rooms using medicated classical oils.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 text-white font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="font-serif font-bold text-foreground text-lg mb-1.5">Continuous Monitoring</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Regular post-therapy follow-ups, Pathya-Apathya dietary charts, and lifestyle counseling for lasting recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    cta: (
      <section className="pb-16 pt-6">
        <div className="section-container">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center shadow-elevated">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Need Immediate Doctor Consultation?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm sm:text-base mb-6">
              Call our dedicated clinical desk or walk into our Greater Noida hospital for immediate Nadi Pariksha and diagnosis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="gold" 
                size="lg"
                className="font-bold shadow-md"
                onClick={() => setSelectedDoctor("Senior Duty Consultant")}
              >
                Book Online Consultation
              </Button>
              <a
                href="tel:+919582761166"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white/80 text-white font-semibold hover:bg-white hover:text-primary transition-all text-sm"
              >
                Call: +91-9582761166
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "searchFilters", "doctorList", "opdSchedule", "patientCareStandards", "cta"];

  return (
    <Layout>
      <ConsultationModal 
        open={!!selectedDoctor} 
        onOpenChange={(open) => !open && setSelectedDoctor(null)} 
        doctorName={selectedDoctor || undefined}
      />
      <DynamicPageSections
        pageId="doctors"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default Doctors;
