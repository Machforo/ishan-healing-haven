import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar, CheckCircle } from "lucide-react";

const departmentData: Record<string, {
  name: string; subtitle: string; description: string;
  conditions: string[]; timings: string; doctors: { name: string; qual: string; days: string }[];
}> = {
  kayachikitsa: {
    name: "Kayachikitsa", subtitle: "General Medicine OPD",
    description: "The Kayachikitsa department provides comprehensive Ayurvedic treatment for internal diseases including metabolic, digestive, neurological, and musculoskeletal disorders. Our approach combines classical Ayurvedic pharmacology with modern diagnostic methods.",
    conditions: ["Diabetes (Prameha)", "Arthritis & Joint Pain", "Digestive Disorders", "Skin Diseases", "Respiratory Issues", "Neurological Conditions", "Thyroid Disorders", "Obesity & Metabolic Syndrome"],
    timings: "Mon, Wed, Fri – 9 AM to 4 PM",
    doctors: [{ name: "Dr. Anita Sharma", qual: "MD (Kayachikitsa)", days: "Mon, Wed, Fri" }],
  },
  "panchkarma-opd": {
    name: "Panchkarma OPD", subtitle: "Purification Therapy Centre",
    description: "Our Panchkarma OPD conducts patient assessment, designs personalised detox plans, and manages treatment follow-ups. The therapy rooms are equipped with traditional instruments and modern amenities for a comfortable experience.",
    conditions: ["Chronic Pain", "Autoimmune Disorders", "Stress & Anxiety", "Digestive Issues", "Skin Conditions", "Respiratory Problems", "Post-Surgery Recovery", "General Detoxification"],
    timings: "Mon–Sat – 9 AM to 4 PM",
    doctors: [{ name: "Dr. Rajesh Kumar", qual: "MD (Panchkarma)", days: "Mon–Sat" }],
  },
  prasuti: {
    name: "Prasuti Tantra", subtitle: "Gynaecology & Maternity OPD",
    description: "Comprehensive Ayurvedic gynaecological care including antenatal programs, menstrual disorder management, and fertility support using time-tested Ayurvedic formulations and dietary protocols.",
    conditions: ["PCOS / PCOD", "Menstrual Disorders", "Antenatal Care", "Infertility Support", "Menopausal Management", "Leucorrhoea", "Uterine Disorders"],
    timings: "Tue, Thu, Sat – 9 AM to 4 PM",
    doctors: [{ name: "Dr. Priya Verma", qual: "MS (Prasuti Tantra)", days: "Tue, Thu, Sat" }],
  },
  kaumarabhritya: {
    name: "Kaumarabhritya", subtitle: "Paediatrics OPD",
    description: "Child-friendly Ayurvedic care for growth, immunity, and common childhood ailments using gentle herbal formulations and dietary guidance tailored for young patients.",
    conditions: ["Growth Disorders", "Low Immunity", "Childhood Asthma", "Digestive Issues", "Skin Allergies", "Behavioural Issues", "Nutritional Deficiencies"],
    timings: "Mon–Fri – 9 AM to 2 PM",
    doctors: [{ name: "Dr. Vikram Singh", qual: "MD (Kaumarabhritya)", days: "Mon–Fri" }],
  },
  shalakya: {
    name: "Shalakya Tantra", subtitle: "ENT & Eye Care OPD",
    description: "Specialised Ayurvedic treatments for eye, ear, nose, and throat conditions using Netrabasti, Karnapoorana, Nasya, and other classical therapies.",
    conditions: ["Sinusitis", "Hearing Problems", "Conjunctivitis", "Myopia", "Tonsillitis", "Nasal Polyps", "Allergic Rhinitis"],
    timings: "Tue, Thu – 9 AM to 4 PM",
    doctors: [{ name: "Dr. Meera Gupta", qual: "MS (Shalakya)", days: "Tue, Thu" }],
  },
  shalya: {
    name: "Shalya Tantra", subtitle: "Ayurvedic Surgery OPD",
    description: "Minimally invasive Ayurvedic surgical procedures including Ksharasutra for fistula/piles, Agnikarma for joint pain, and Jalaukavacharana (leech therapy).",
    conditions: ["Fistula-in-Ano", "Haemorrhoids (Piles)", "Chronic Joint Pain", "Varicose Veins", "Pilonidal Sinus", "Corn & Warts"],
    timings: "Mon, Wed, Fri – 9 AM to 4 PM",
    doctors: [{ name: "Dr. Suresh Yadav", qual: "MS (Shalya)", days: "Mon, Wed, Fri" }],
  },
  yoga: {
    name: "Yoga & Wellness", subtitle: "Therapeutic Yoga OPD",
    description: "Therapeutic yoga sessions for stress management, chronic pain, lifestyle disorders, and overall wellness. Individual and group sessions available.",
    conditions: ["Stress & Anxiety", "Chronic Back Pain", "Hypertension", "Insomnia", "Obesity", "Depression", "Lifestyle Disorders"],
    timings: "Mon–Sat – 7 AM to 10 AM, 4 PM to 6 PM",
    doctors: [{ name: "Dr. Kavita Rao", qual: "MD (Yoga)", days: "Mon–Sat" }],
  },
  pathology: {
    name: "Pathology & Diagnostics", subtitle: "Laboratory Services",
    description: "In-house diagnostic laboratory providing blood tests, urine analysis, and basic diagnostics with quick turnaround times at affordable rates.",
    conditions: ["Blood Tests (CBC, LFT, KFT)", "Urine Analysis", "Blood Sugar Tests", "Lipid Profile", "Thyroid Panel", "ESR & CRP"],
    timings: "Mon–Sat – 8 AM to 5 PM",
    doctors: [{ name: "Dr. Alok Mishra", qual: "MD (Pathology)", days: "Mon–Sat" }],
  },
  pharmacy: {
    name: "Hospital Pharmacy", subtitle: "Dispensary",
    description: "In-house pharmacy dispensing classical and patent Ayurvedic medicines, freshly prepared formulations, and herbal products as prescribed by our doctors.",
    conditions: ["Classical Formulations", "Patent Medicines", "Herbal Products", "Dietary Supplements", "External Applications", "Customised Preparations"],
    timings: "Mon–Sat – 9 AM to 5 PM",
    doctors: [],
  },
};

const DepartmentDetail = () => {
  const { slug } = useParams();
  const dept = departmentData[slug || ""] || departmentData.kayachikitsa;

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{dept.name}</h1>
          <p className="text-primary-foreground/80 text-lg">{dept.subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg mb-10">{dept.description}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <ScrollReveal>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Conditions Treated</h3>
                <ul className="space-y-2.5">
                  {dept.conditions.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">OPD Timings</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" /> {dept.timings}
                  </div>
                </div>

                {dept.doctors.length > 0 && (
                  <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">Doctors</h3>
                    {dept.doctors.map((d) => (
                      <div key={d.name} className="mb-3 last:mb-0">
                        <div className="font-medium text-foreground">{d.name}</div>
                        <div className="text-sm text-muted-foreground">{d.qual}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" /> {d.days}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Link to="/appointment">
                  <Button variant="hero" size="lg" className="w-full">
                    Book Appointment <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DepartmentDetail;
