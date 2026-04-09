import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Stethoscope, BookOpen, HelpCircle, User } from "lucide-react";

const services = [
  { icon: Calendar, name: "OPD Schedule & Timetable", desc: "View weekly OPD schedule with doctor timings.", path: "/patient-services/opd-schedule" },
  { icon: Stethoscope, name: "IPD — In-Patient Admission", desc: "Admission process, room types, rates & amenities.", path: "/patient-services/ipd" },
  { icon: BookOpen, name: "Health Articles & Blog", desc: "Seasonal health tips, Ayurvedic diet, treatment FAQs.", path: "/patient-services/blog" },
  { icon: HelpCircle, name: "Patient FAQs", desc: "Answers to common questions about Ayurvedic treatment.", path: "/patient-services/faqs" },
  { icon: FileText, name: "Medical Camps & Outreach", desc: "Free health camps in Greater Noida & NCR.", path: "/patient-services/camps" },
  { icon: User, name: "Patient Portal", desc: "Login for prescriptions, reports & appointment history.", path: "/patient-portal" },
];

const PatientServices = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Patient Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Everything you need for a seamless healthcare experience at Ishan Ayurvedic Hospital.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 80}>
                <Link to={s.path} className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/appointment">
              <Button variant="hero" size="lg">Book an Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PatientServices;
