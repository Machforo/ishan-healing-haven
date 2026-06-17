import CountUp from "@/components/CountUp";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, Stethoscope, Award, Heart } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";

interface StatType {
  icon: any;
  value: string | number;
  label: string;
  desc?: string;
  gradient?: string;
  bg?: string;
}

const defaultStats: StatType[] = [
  {
    icon: Users,
    value: "25000+",
    label: "Patients Treated Yearly",
    desc: "Trusted by thousands",
    bg: "from-emerald-500/10 to-teal-500/5",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Stethoscope,
    value: "9",
    label: "OPD Departments",
    desc: "Covering all major specialities",
    bg: "from-blue-500/10 to-indigo-500/5",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Award,
    value: "30",
    label: "Years of Excellence",
    desc: "Decades of authentic healing",
    bg: "from-amber-500/10 to-orange-500/5",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Heart,
    value: "15",
    label: "Panchkarma Therapies",
    desc: "Classical & proven treatments",
    bg: "from-rose-500/10 to-pink-500/5",
    gradient: "from-rose-500 to-pink-500"
  }
];

const iconMap: Record<string, any> = {
  Users,
  Stethoscope,
  Award,
  Heart
};

const StatsBar = () => {
  const { data } = useHospitalData("homepage");

  // Handle various api response shapes for stats
  let backendStats: any[] = [];
  if (data?.stats && Array.isArray(data.stats) && data.stats.length > 0) {
    backendStats = data.stats;
  } else if (Array.isArray(data) && data.length > 0) {
    // If the whole response is an array of stats
    backendStats = data;
  }

  const statsToRender = backendStats.length > 0 ? backendStats : defaultStats;

  // Extract numeric part from a string for CountUp (e.g., "5000+" -> 5000)
  const extractNum = (val: string | number) => {
    if (typeof val === 'number') return val;
    const match = val.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };
  // Extract suffix part (e.g., "5000+" -> "+")
  const extractSuffix = (val: string | number) => {
    if (typeof val === 'number') return "";
    const match = val.replace(/\d+/g, '').trim();
    return match;
  };

  return (
    <section className="relative z-20 -mt-8 sm:-mt-14">
      <div className="section-container">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsToRender.map((stat: any, i: number) => {
              const defaultIdx = defaultStats.length > 0 ? i % defaultStats.length : 0;
              const bg = stat.bg || (defaultStats[defaultIdx]?.bg || "from-emerald-500/10 to-teal-500/5");
              const gradient = stat.gradient || (defaultStats[defaultIdx]?.gradient || "from-emerald-500 to-teal-500");
              
              let Icon = defaultStats[defaultIdx]?.icon || Users;
              if (stat.icon) {
                if (typeof stat.icon === "string") {
                  Icon = iconMap[stat.icon] || Icon;
                } else {
                  Icon = stat.icon;
                }
              }

              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${bg} border border-white/80 rounded-2xl p-5 sm:p-6 shadow-elevated text-center group hover:shadow-gold transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden`}
                >
                  {/* Background glow */}
                  <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />

                  {/* Icon */}
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-soft`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Number */}
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-0.5">
                    <CountUp end={extractNum(stat.value)} suffix={extractSuffix(stat.value)} />
                  </div>

                  {/* Label */}
                  <div className="text-sm font-semibold text-foreground/80 mb-1">{stat.label}</div>

                  {/* Description */}
                  <div className="text-xs text-muted-foreground hidden sm:block">{stat.desc || ""}</div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsBar;
