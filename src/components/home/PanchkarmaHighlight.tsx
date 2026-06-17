import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircle, ArrowRight } from "lucide-react";
import panchkarmaImg from "@/assets/panchkarma-room.jpg";
import { useHospitalData } from "@/hooks/useHospitalData";

const benefits = [
  "Ancient purification therapies for modern ailments",
  "Personalised treatment plans by experienced Vaidyas",
  "Authentic Ayurvedic medicines prepared in-house",
  "Comprehensive pre & post therapy care",
  "Tranquil healing environment with herbal garden",
];

const PanchkarmaHighlight = () => {
  const { data } = useHospitalData("homepage");

  const heading = data?.panchkarmaHeading || "Panchkarma Therapy Centre";
  const description = data?.panchkarmaDescription || "Our Panchkarma Centre offers the five classical purification therapies — Vamana, Virechana, Basti, Nasya, and Raktamokshana — administered by certified Ayurvedic physicians in a serene, healing environment.";
  const image = data?.panchkarmaImage || panchkarmaImg;

  const rawBenefits = data?.panchkarmaBenefits || benefits;
  const displayBenefits = rawBenefits.map((b: any) => {
    if (typeof b === "string") return b;
    return b.text || b.name || JSON.stringify(b);
  });

  return (
    <section className="py-12 sm:py-20">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative">
              <img
                src={image}
                alt="Panchkarma Therapy Centre"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={1280}
                height={720}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = panchkarmaImg;
                }}
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 gradient-gold rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-gold">
                <div className="font-serif text-xl sm:text-2xl font-bold text-foreground">{displayBenefits.length}+</div>
                <div className="text-xs sm:text-sm text-foreground/80">Panchkarma Therapies</div>
              </div>
            </div>
          </ScrollReveal>
 
          <ScrollReveal delay={200}>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Signature Treatment</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5">
                {heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
              <ul className="space-y-3 mb-8">
                {displayBenefits.slice(0, 5).map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/panchkarma">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Explore Panchkarma <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/appointment">
                  <Button variant="outline-primary" size="lg" className="w-full sm:w-auto">
                    Book Therapy
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PanchkarmaHighlight;
