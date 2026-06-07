import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Users, Heart, Leaf } from "lucide-react";
import { useAyurvedaData } from "@/hooks/useAyurvedaData";

const defaultReasons = [
  { icon: Award, title: "NCISM Approved", desc: "Recognised teaching hospital under the National Commission for Indian System of Medicine." },
  { icon: Heart, title: "Affordable Care", desc: "Quality Ayurvedic treatments at subsidised rates, making holistic healthcare accessible to all." },
  { icon: Users, title: "Expert Vaidyas", desc: "Team of MD Ayurveda specialists with decades of clinical and academic experience." },
  { icon: Leaf, title: "Authentic Panchkarma", desc: "Classical five-fold purification therapies administered per Charaka Samhita protocols." },
];

const WhyIshan = () => {
  const { data: homeData } = useAyurvedaData("homepage");
  const { data: aboutData } = useAyurvedaData("aboutus");

  const reasons = homeData?.whyChooseUs?.length > 0 ? homeData.whyChooseUs : defaultReasons;
  const missionDesc = aboutData?.missionVision?.mission || aboutData?.ourStory?.description || 
    "Ishan Ayurvedic Hospital is committed to bringing the ancient science of Ayurveda to the modern world. As the teaching hospital of Ishan Ayurvedic Medical College, we combine rigorous academic training with compassionate patient care.\n\nLocated in the heart of Greater Noida, we serve the Delhi NCR region with affordable, evidence-informed Ayurvedic treatments. Our Panchkarma centre, equipped with modern amenities and traditional therapy rooms, offers a healing experience that addresses the root cause of disease.\n\nFrom chronic lifestyle disorders to acute conditions, our team of experienced Vaidyas works holistically — integrating Ayurvedic medicines, Panchkarma therapies, Yoga, and dietary guidance to restore balance and well-being.";

  return (
    <Layout>
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Why Ishan Ayurvedic Hospital?
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            The only private NCISM-approved Ayurvedic teaching hospital in Delhi NCR offering world-class holistic care.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {reasons.map((r: any, i: number) => {
              const Icon = r.icon && typeof r.icon !== 'string' ? r.icon : defaultReasons[i % defaultReasons.length].icon;
              return (
              <ScrollReveal key={r.title || r.heading} delay={i * 100}>
                <div className="flex gap-5 p-6 bg-card rounded-xl shadow-soft border border-border/50 hover:shadow-elevated transition-all">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{r.title || r.heading}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{r.desc || r.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            )})}
          </div>

          <ScrollReveal>
            <div className="bg-muted/50 rounded-2xl p-6 sm:p-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-5">Our Mission</h2>
              {missionDesc.split('\n').filter((l: string) => l.trim()).map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
              <div className="flex flex-wrap gap-3 mt-6">
                {["Personalised Care", "In-House Pharmacy", "Herbal Garden", "Research-Backed", "Patient-Centric"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <Link to="/appointment">
              <Button variant="hero" size="lg">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyIshan;
