import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, Stethoscope, Award, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: 25000, suffix: "+", label: "Patients Treated Yearly" },
  { icon: Stethoscope, value: 9, suffix: "", label: "OPD Departments" },
  { icon: Award, value: 30, suffix: "+", label: "Years of Excellence" },
  { icon: Heart, value: 15, suffix: "+", label: "Panchkarma Therapies" },
];

const StatsBar = () => {
  return (
    <section className="relative -mt-12 z-20">
      <div className="section-container">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 shadow-elevated text-center group hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-serif text-3xl font-bold text-foreground mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsBar;
