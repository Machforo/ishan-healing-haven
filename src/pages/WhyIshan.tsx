import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Users, Heart, Leaf, Eye, Target } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";
import PageGallery from "@/components/PageGallery";

const defaultReasons = [
  {
    icon: Award,
    title: "Experienced Vaidyas",
    desc: "Our treatments are guided by highly qualified Ayurvedic doctors and Panchkarma specialists."
  },
  {
    icon: Heart,
    title: "Authentic Medicines",
    desc: "We use high-quality, pure Ayurvedic formulations sourced from trusted traditional pharmacies."
  },
  {
    icon: Users,
    title: "Holistic Approach",
    desc: "We address the root causes of illnesses, not just the symptoms, through tailored therapy plans."
  },
  {
    icon: Leaf,
    title: "State-of-the-Art Facility",
    desc: "A peaceful environment with fully-equipped, hygienic Panchkarma rooms and modern amenities."
  }
];

const WhyIshan = () => {
  const { data: homeData } = useHospitalData("homepage");
  const { data: aboutData } = useHospitalData("aboutus");

  const reasons = homeData?.whyChooseUs?.length > 0 ? homeData.whyChooseUs : defaultReasons;
  
  const storyDesc = aboutData?.ourStory?.description || 
    "Ishan Ayurvedic Hospital is committed to bringing the ancient science of Ayurveda to the modern world. As the teaching hospital of Ishan Ayurvedic Medical College, we combine rigorous academic training with compassionate patient care.\n\nLocated in the heart of Greater Noida, we serve the Delhi NCR region with affordable, evidence-informed Ayurvedic treatments. Our Panchkarma centre, equipped with modern amenities and traditional therapy rooms, offers a healing experience that addresses the root cause of disease.\n\nFrom chronic lifestyle disorders to acute conditions, our team of experienced Vaidyas works holistically — integrating Ayurvedic medicines, Panchkarma therapies, Yoga, and dietary guidance to restore balance and well-being.";

  const storyImage = aboutData?.ourStory?.image || 
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80";

  const visionText = aboutData?.missionVision?.vision || 
    "To render accessible, safe, and authentic Ayurvedic treatments to all segments of society.";

  const missionText = aboutData?.missionVision?.mission || 
    "To integrate classical therapeutic regimens with modern diagnostic standards.";

  const rawTags = aboutData?.missionVision?.values || ["Personalised Care", "In-House Pharmacy", "Herbal Garden", "Research-Backed", "Patient-Centric"];
  const displayTags = rawTags.map((v: any) => typeof v === 'string' ? v : (v.text || JSON.stringify(v)));

  return (
    <Layout>
      {/* Page Header */}
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {aboutData?.title || "Why Ishan Ayurvedic Hospital?"}
          </h1>
          <p className="text-primary-foreground/80 max-w-3xl mx-auto text-base sm:text-lg">
            {aboutData?.subtitle || "The only private NCISM-approved Ayurvedic teaching hospital in Delhi NCR offering world-class holistic care."}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <ScrollReveal>
                <span className="text-sm font-semibold tracking-wider text-primary uppercase block mb-3">About Us</span>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Our Healing Legacy</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                  {storyDesc.split('\n').filter((l: string) => l.trim()).map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5">
              <ScrollReveal delay={200}>
                <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border/60">
                  <img 
                    src={storyImage} 
                    alt="Our Story" 
                    className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-muted/40 border-y border-border/40">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <ScrollReveal>
              <div className="h-full bg-card rounded-2xl p-8 shadow-soft border border-border/50 flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">{visionText}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal delay={150}>
              <div className="h-full bg-card rounded-2xl p-8 shadow-soft border border-border/50 flex flex-col sm:flex-row gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">{missionText}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Core Values */}
          <ScrollReveal delay={300}>
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-soft border border-border/50 text-center">
              <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6">Our Core Pillars & Values</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {displayTags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-primary/5 text-primary border border-primary/10 rounded-full px-5 py-2 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us (Reasons Grid) */}
      <section className="py-16 sm:py-24">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-wider text-primary uppercase block mb-3">
              {homeData?.whyChooseUsSub || "Why Choose Us"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {homeData?.whyChooseUsHeading || "Excellence in Ayurvedic Care"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r: any, i: number) => {
              const defaultIdx = defaultReasons.length > 0 ? i % defaultReasons.length : 0;
              const Icon = r.icon && typeof r.icon !== 'string' ? r.icon : (defaultReasons[defaultIdx]?.icon || Award);
              return (
                <ScrollReveal key={r.title || r.heading} delay={i * 100}>
                  <div className="h-full flex flex-col p-6 bg-card rounded-xl shadow-soft border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3">{r.title || r.heading}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{r.desc || r.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link to="/appointment">
              <Button variant="hero" size="lg" className="px-8">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    <PageGallery />
    </Layout>
  );
};

export default WhyIshan;
