import ScrollReveal from "@/components/ScrollReveal";
import { useHospitalData } from "@/hooks/useHospitalData";
import { Award, Heart, Users, Leaf, CheckCircle } from "lucide-react";

const defaultReasons = [
  {
    icon: Award,
    heading: "Experienced Vaidyas",
    description: "Our treatments are guided by highly qualified Ayurvedic doctors and Panchkarma specialists."
  },
  {
    icon: Heart,
    heading: "Authentic Medicines",
    description: "We use high-quality, pure Ayurvedic formulations sourced from trusted traditional pharmacies."
  },
  {
    icon: Users,
    heading: "Holistic Approach",
    description: "We address the root causes of illnesses, not just the symptoms, through tailored therapy plans."
  },
  {
    icon: Leaf,
    heading: "State-of-the-Art Facility",
    description: "A peaceful environment with fully-equipped, hygienic Panchkarma rooms and modern amenities."
  }
];

const WhyChooseUs = () => {
  const { data } = useHospitalData("homepage");
  const reasons = data?.whyChooseUs?.length > 0 ? data.whyChooseUs : defaultReasons;

  return (
    <section className="py-14 sm:py-20 bg-muted/40">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {data?.whyChooseUsSub || "Why Choose Us"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">
              {data?.whyChooseUsHeading || "Excellence in Ayurvedic Care"}
            </h2>
          </div>
        </ScrollReveal>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r: any, i: number) => {
            const defaultIdx = defaultReasons.length > 0 ? i % defaultReasons.length : 0;
            const Icon = r.icon && typeof r.icon !== 'string' ? r.icon : (defaultReasons[defaultIdx]?.icon || Award);
            return (
              <ScrollReveal key={r.heading || i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 h-full text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-5 shadow-soft">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{r.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
