import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Leaf, Baby, Eye, Scissors, Dumbbell, FlaskConical, Pill, Heart } from "lucide-react";

const departments = [
  { icon: Heart, name: "Kayachikitsa", subtitle: "General Medicine", path: "/departments/kayachikitsa", color: "from-emerald-500 to-emerald-700" },
  { icon: Leaf, name: "Panchkarma", subtitle: "Purification Therapy", path: "/departments/panchkarma-opd", color: "from-amber-500 to-amber-700" },
  { icon: Heart, name: "Prasuti Tantra", subtitle: "Gynaecology & Maternity", path: "/departments/prasuti", color: "from-pink-500 to-pink-700" },
  { icon: Baby, name: "Kaumarabhritya", subtitle: "Paediatrics", path: "/departments/kaumarabhritya", color: "from-sky-500 to-sky-700" },
  { icon: Eye, name: "Shalakya Tantra", subtitle: "ENT & Eye Care", path: "/departments/shalakya", color: "from-violet-500 to-violet-700" },
  { icon: Scissors, name: "Shalya Tantra", subtitle: "Ayurvedic Surgery", path: "/departments/shalya", color: "from-red-500 to-red-700" },
  { icon: Dumbbell, name: "Yoga & Wellness", subtitle: "Therapeutic Yoga", path: "/departments/yoga", color: "from-teal-500 to-teal-700" },
  { icon: FlaskConical, name: "Pathology Lab", subtitle: "Diagnostics", path: "/departments/pathology", color: "from-indigo-500 to-indigo-700" },
  { icon: Pill, name: "Pharmacy", subtitle: "Dispensary", path: "/departments/pharmacy", color: "from-orange-500 to-orange-700" },
];

const Departments = () => {
  return (
    <section className="py-12 sm:py-20 bg-muted/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Our Specialities</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              9 OPD Departments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Ayurvedic care across all major specialities, led by experienced practitioners.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept, i) => (
            <ScrollReveal key={dept.name} delay={i * 80}>
              <Link
                to={dept.path}
                className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <dept.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{dept.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{dept.subtitle}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
