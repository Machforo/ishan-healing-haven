import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is Ayurvedic treatment safe?", a: "Yes, when administered by qualified Ayurvedic practitioners. All treatments at our hospital follow NCISM-approved protocols and use quality-tested medicines. Our doctors are MD/MS qualified in Ayurveda." },
  { q: "What should I expect during my first visit?", a: "Your first consultation includes Nadi Pariksha (pulse diagnosis), detailed case history, dietary assessment, and Prakriti (constitution) analysis. The doctor will explain your treatment plan and expected outcomes." },
  { q: "How long does Panchkarma treatment take?", a: "Depending on the therapy, Panchkarma courses typically last 7-21 days. Pre-treatment preparation (Poorvakarma) and post-treatment care (Paschat Karma) are included in the treatment timeline." },
  { q: "Can I take Ayurvedic medicines along with allopathic medicines?", a: "In many cases, yes. However, always inform our doctors about any allopathic medications you are taking. They will guide you on safe combinations and any necessary adjustments." },
  { q: "What diet should I follow during treatment?", a: "Our doctors will prescribe a specific diet (Pathya) based on your condition and treatment. Generally, light, warm, freshly cooked food is recommended. Specific restrictions will be communicated during consultation." },
  { q: "Is Ayurveda effective for chronic diseases?", a: "Ayurveda has shown excellent results in managing chronic conditions like diabetes, arthritis, skin diseases, digestive disorders, and hormonal imbalances. The approach addresses root causes, not just symptoms." },
  { q: "What are the consultation charges?", a: "Our OPD consultation fees are subsidised to make quality Ayurvedic care accessible. Please contact our reception for current fee structure or visit our hospital directly." },
  { q: "Do you offer home-based treatments?", a: "While most Panchkarma treatments require in-hospital care, our doctors provide take-home medicines and self-care protocols. Home collection for lab tests can be arranged on request." },
  { q: "What conditions can Ksharasutra treat?", a: "Ksharasutra is highly effective for fistula-in-ano, haemorrhoids (piles), and pilonidal sinus. It's a minimally invasive procedure with high success rates and quick recovery." },
  { q: "Can children receive Ayurvedic treatment?", a: "Yes, our Kaumarabhritya (Paediatrics) department specialises in child-friendly Ayurvedic treatments using gentle herbal formulations appropriate for young patients." },
];

const PatientFAQs = () => {
  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Patient FAQs</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Common questions about Ayurvedic treatment at Ishan Hospital.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-3xl">
          <ScrollReveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 shadow-soft px-5">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default PatientFAQs;
