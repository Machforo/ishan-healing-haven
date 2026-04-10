import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, Stethoscope, Award, Heart } from "lucide-react";

const stats = [
  { 
    icon: Users, 
    value: 25000, 
    suffix: "+", 
    label: "Patients Treated Yearly",
    desc: "Trusted by thousands annually",
    gradient: "from-emerald-500 to-emerald-700",
    bg: "from-emerald-50 to-emerald-100/60",
  },
  { 
    icon: Stethoscope, 
    value: 9, 
    suffix: "", 
    label: "OPD Departments",
    desc: "Covering all major specialities",
    gradient: "from-amber-500 to-amber-700",
    bg: "from-amber-50 to-amber-100/60",
  },
  { 
    icon: Award, 
    value: 30, 
    suffix: "+", 
    label: "Years of Excellence",
    desc: "Decades of authentic healing",
    gradient: "from-primary to-primary/70",
    bg: "from-green-50 to-green-100/60",
  },
  { 
    icon: Heart, 
    value: 15, 
    suffix: "+", 
    label: "Panchkarma Therapies",
    desc: "Classical & proven treatments",
    gradient: "from-rose-500 to-rose-700",
    bg: "from-rose-50 to-rose-100/60",
  },
];

const StatsBar = () => {
  return (
    <section className="relative z-20 -mt-8 sm:-mt-14">
      <div className="section-container">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.bg} border border-white/80 rounded-2xl p-5 sm:p-6 shadow-elevated text-center group hover:shadow-gold transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden`}
              >
                {/* Background glow */}
                <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />

                {/* Icon */}
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-soft`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Number */}
                <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-0.5">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-foreground/80 mb-1">{stat.label}</div>

                {/* Description */}
                <div className="text-xs text-muted-foreground hidden sm:block">{stat.desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsBar;
