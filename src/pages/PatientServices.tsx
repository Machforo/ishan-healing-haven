import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Stethoscope, BookOpen, HelpCircle, User } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";
import PageGallery from "@/components/PageGallery";

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

  return (
    <Layout>
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((s: any, i: number) => {
              const Icon = iconMap[s.icon] || HelpCircle;
              return (
                <ScrollReveal key={s.name || i} delay={i * 80}>
                  <Link to={s.path} className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc || s.description}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/appointment">
              <Button variant="hero" size="lg">Book an Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
};

export default PatientServices;
