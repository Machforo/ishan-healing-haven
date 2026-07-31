import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ConsultationModal } from "@/components/ConsultationModal";
import { useHospitalData } from "@/hooks/useHospitalData";
import PageGallery from "@/components/PageGallery";

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
  // Querying "doctors" endpoint since there is no "faculty" endpoint on the backend
  const { data } = useHospitalData("doctors");
  const { data: homeData } = useHospitalData("homepage");

  // Determine actual doctors list based on api response structure
  let allDoctors: DoctorType[] = defaultDoctors;
  if (Array.isArray(data) && data.length > 0) {
    allDoctors = data;
  } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    allDoctors = data.data;
  } else if (data?.doctors && Array.isArray(data.doctors) && data.doctors.length > 0) {
    allDoctors = data.doctors;
  }

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <Layout>
      <ConsultationModal 
        open={!!selectedDoctor} 
        onOpenChange={(open) => !open && setSelectedDoctor(null)} 
        doctorName={selectedDoctor || undefined}
      />
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {homeData?.doctorsHeading || "Our Medical Team"}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {homeData?.doctorsDescription || "Qualified MD/MS Ayurveda practitioners with extensive clinical experience."}
          </p>
        </div>
      </section>
 
      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allDoctors.map((doc, i) => (
              <ScrollReveal key={doc.name} delay={i * 80}>
                <div className="bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 flex flex-col xs:flex-row">
                  <div className="w-full xs:w-40 h-48 xs:h-auto overflow-hidden shrink-0">
                    <img 
                      src={doc.image || doc.avatar} 
                      alt={doc.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name || "Doctor")}&size=400&background=145428&color=fff&font-size=0.4`;
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium">{doc.dept || doc.department || doc.speciality}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.qual || doc.qualifications} · {doc.exp || doc.experience}</p>
                    <p className="text-sm text-foreground/70 mt-2 leading-relaxed line-clamp-3">{doc.bio || doc.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        <Calendar className="w-3.5 h-3.5" /> {doc.days || "Mon-Sat"}
                      </span>
                      <Button 
                        variant="gold" 
                        size="sm"
                        className="h-8 px-4 text-xs font-bold"
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
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
};

export default Doctors;
