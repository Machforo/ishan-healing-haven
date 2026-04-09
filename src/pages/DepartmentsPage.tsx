import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Baby, Eye, Scissors, Dumbbell, FlaskConical, Pill, Heart } from "lucide-react";

const departments = [
  { icon: Heart, name: "Kayachikitsa", subtitle: "General Medicine", path: "/departments/kayachikitsa", desc: "Diabetes, arthritis, digestive & neurological disorders." },
  { icon: Leaf, name: "Panchkarma OPD", subtitle: "Purification Therapy", path: "/departments/panchkarma-opd", desc: "Patient assessment, treatment planning & follow-up." },
  { icon: Heart, name: "Prasuti Tantra", subtitle: "Gynaecology & Maternity", path: "/departments/prasuti", desc: "PCOS, antenatal care, menstrual disorders." },
  { icon: Baby, name: "Kaumarabhritya", subtitle: "Paediatrics", path: "/departments/kaumarabhritya", desc: "Child health, immunity, growth disorders." },
  { icon: Eye, name: "Shalakya Tantra", subtitle: "ENT & Eye Care", path: "/departments/shalakya", desc: "Sinusitis, myopia, hearing, Netrabasti." },
  { icon: Scissors, name: "Shalya Tantra", subtitle: "Surgery", path: "/departments/shalya", desc: "Ksharasutra, Agnikarma, Jalaukavacharana." },
  { icon: Dumbbell, name: "Yoga & Wellness", subtitle: "Therapeutic Yoga", path: "/departments/yoga", desc: "Stress, chronic pain, lifestyle disorders." },
  { icon: FlaskConical, name: "Pathology Lab", subtitle: "Diagnostics", path: "/departments/pathology", desc: "Blood, urine analysis, quick TAT." },
  { icon: Pill, name: "Pharmacy", subtitle: "Dispensary", path: "/departments/pharmacy", desc: "Classical & patent Ayurvedic medicines." },
];

const DepartmentsPage = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Departments</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            9 specialised OPD departments providing comprehensive Ayurvedic healthcare.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <ScrollReveal key={dept.name} delay={i * 80}>
                <Link to={dept.path} className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <dept.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{dept.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{dept.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4">{dept.desc}</p>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DepartmentsPage;
