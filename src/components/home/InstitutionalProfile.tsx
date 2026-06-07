import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useHospitalData } from "@/hooks/useHospitalData";
import { ArrowRight } from "lucide-react";

const InstitutionalProfile = () => {
  const { data } = useHospitalData("homepage");
  const profile = data?.institutionalProfile;

  if (!profile) return null;

  return (
    <section className="py-12 sm:py-20">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative">
              <img
                src={profile.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"}
                alt={profile.heading}
                className="rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">{profile.subheading}</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5">
                {profile.heading}
              </h2>
              <div className="text-muted-foreground leading-relaxed mb-8 space-y-4">
                {profile.description?.split('\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              {profile.ctaText && (
                <Link to={profile.ctaLink || "/about"}>
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    {profile.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalProfile;
