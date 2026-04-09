import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

const therapyData: Record<string, {
  name: string; description: string; conditions: string[];
  procedure: string; duration: string; eligibility: string;
}> = {
  vamana: {
    name: "Vamana (Therapeutic Emesis)",
    description: "Vamana is a controlled therapeutic emesis procedure that eliminates excess Kapha dosha from the body. It is one of the five Panchkarma procedures and is especially effective for respiratory and skin conditions.",
    conditions: ["Bronchial Asthma", "Chronic Cold & Cough", "Skin Diseases (Psoriasis, Eczema)", "Obesity", "Allergic Conditions", "Sinusitis"],
    procedure: "Pre-procedure involves 3-7 days of internal oleation (Snehapana) and external oleation (Abhyanga), followed by steam therapy (Swedana). On the day of Vamana, medicated emetic drugs are administered under supervision.",
    duration: "3–7 days total including preparation and post-care",
    eligibility: "Adults with Kapha-dominant conditions. Not recommended during pregnancy, cardiac conditions, or extreme debility.",
  },
  virechana: {
    name: "Virechana (Therapeutic Purgation)",
    description: "Virechana is a medically controlled purgation therapy that eliminates excess Pitta dosha and toxins from the liver, gallbladder, and GI tract.",
    conditions: ["Liver Disorders", "Skin Diseases", "Chronic Digestive Issues", "Jaundice", "Hyperacidity", "Hormonal Imbalances"],
    procedure: "Preparation includes 3-5 days of oleation and swedana. Purgative medicines are administered on the scheduled day. The entire process is monitored by experienced physicians.",
    duration: "5–8 days including preparation",
    eligibility: "Suitable for Pitta-dominant conditions. Contraindicated in pregnancy, rectal prolapse, and severe debility.",
  },
  basti: {
    name: "Basti (Enema Therapy)",
    description: "Basti is considered the most important of the five Panchkarma procedures. It involves administration of medicated oils or decoctions through the rectal route to treat Vata-dominant disorders.",
    conditions: ["Neurological Disorders", "Arthritis", "Lower Back Pain", "Sciatica", "Constipation", "Paralysis", "Infertility"],
    procedure: "Two types are administered: Anuvasana Basti (oil-based) and Niruha Basti (decoction-based). A course typically alternates between both types over 8-15 days.",
    duration: "8–15 days for a complete course",
    eligibility: "Effective for most adults with Vata disorders. Not recommended for severe diarrhoea, rectal bleeding, or acute fever.",
  },
  nasya: {
    name: "Nasya (Nasal Therapy)",
    description: "Nasya involves administration of medicated oils, powders, or herbal preparations through the nasal passage to treat diseases above the clavicle.",
    conditions: ["Sinusitis", "Migraines & Headaches", "Cervical Spondylosis", "Hair Fall", "Facial Paralysis", "Mental Disorders"],
    procedure: "After facial oil massage and steam, medicated drops or powder is administered in each nostril. The patient is positioned with head tilted back.",
    duration: "7–14 days for a therapeutic course",
    eligibility: "Suitable for conditions above the clavicle. Avoid during acute cold, immediately after meals, or in children under 7.",
  },
  raktamokshana: {
    name: "Raktamokshana (Bloodletting)",
    description: "Raktamokshana is a specialised detoxification procedure for blood-related disorders. It includes Jalaukavacharana (leech therapy) and Siravedha (venepuncture).",
    conditions: ["Skin Diseases (Eczema, Psoriasis)", "Varicose Veins", "Gout", "Non-Healing Ulcers", "Abscess", "Hypertension"],
    procedure: "Depending on the condition, either medicinal leeches are applied to affected areas or controlled venepuncture is performed at specific points.",
    duration: "Single or multiple sittings as prescribed",
    eligibility: "Elective procedure for specific Rakta-dominant conditions. Not recommended in anaemia, pregnancy, or bleeding disorders.",
  },
  other: {
    name: "Other Therapies",
    description: "Beyond the five classical Panchkarma procedures, we offer several therapeutic treatments that complement the purification process or serve as standalone wellness therapies.",
    conditions: ["Abhyanga (Full Body Oil Massage)", "Shirodhara (Oil Stream on Forehead)", "Kati Basti (Lower Back Treatment)", "Netra Tarpana (Eye Rejuvenation)", "Karna Poorana (Ear Treatment)", "Pinda Sweda (Bolus Massage)"],
    procedure: "Each therapy follows classical Ayurvedic protocols. Duration and frequency depend on the specific treatment and patient condition.",
    duration: "30–90 minutes per session",
    eligibility: "Generally suitable for most adults. Individual suitability assessed during consultation.",
  },
};

const PanchkarmaDetail = () => {
  const { slug } = useParams();
  const therapy = therapyData[slug || ""] || null;

  if (!therapy) {
    // Overview page
    return (
      <Layout>
        <section className="gradient-primary py-20">
          <div className="section-container text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Panchkarma Therapies</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              The five classical purification therapies of Ayurveda for deep detoxification and rejuvenation.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="section-container">
            <ScrollReveal>
              <div className="bg-muted/50 rounded-2xl p-8 mb-12">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What is Panchkarma?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Panchkarma literally means &ldquo;five actions&rdquo; — a comprehensive system of Ayurvedic detoxification that cleanses the body of accumulated toxins (Ama) and restores the natural balance of the three doshas: Vata, Pitta, and Kapha.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  At Ishan Ayurvedic Hospital, our Panchkarma Centre offers all five classical therapies under the guidance of experienced Ayurvedic physicians in a serene, healing environment equipped with both traditional instruments and modern amenities.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(therapyData).map(([key, t], i) => (
                <ScrollReveal key={key} delay={i * 80}>
                  <Link to={`/panchkarma/${key}`} className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{t.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{t.description}</p>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{therapy.name}</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg mb-10">{therapy.description}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <ScrollReveal>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Conditions Treated</h3>
                <ul className="space-y-2.5">
                  {therapy.conditions.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-5">
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Procedure</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{therapy.procedure}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                  <div className="flex items-center gap-2 text-foreground mb-1">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium">Duration:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{therapy.duration}</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                  <div className="flex items-center gap-2 text-foreground mb-1">
                    <AlertCircle className="w-4 h-4 text-accent" />
                    <span className="font-medium">Eligibility:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{therapy.eligibility}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="text-center">
            <Link to="/appointment">
              <Button variant="hero" size="lg">Book This Therapy <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PanchkarmaDetail;
