import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { rt } from "@/lib/richText";
import DynamicPageSections from "@/components/DynamicPageSections";

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
  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            Patient Support & Knowledge Base
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            Essential information regarding Ayurvedic consultations, Panchakarma therapy durations, dietary guidelines, and hospital admissions.
          </p>
        </div>
      </section>
    ),
    categoryTabs: (
      <section className="py-6 bg-muted/40 border-b border-border/50">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["All Questions", "First Consultation & Diagnosis", "Panchakarma Therapies", "Medicines & Diet", "IPD & Charges"].map((cat, idx) => (
              <span
                key={cat}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  idx === 0
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background border border-border text-foreground/70 hover:bg-muted"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>
    ),
    faqSection: (
      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/50 sticky top-24">
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80" alt="Ayurvedic Treatment" className="w-full h-80 object-cover" />
                  <div className="p-6 bg-card">
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">Have a Special Health Concern?</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Our senior doctors review complicated health reports and past medical history before recommending therapies.
                    </p>
                    <a
                      href="tel:+919582761166"
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                    >
                      Call Medical Desk: +91-9582761166 →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="lg:col-span-7">
              <ScrollReveal delay={100}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 shadow-soft px-5">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 text-sm sm:text-base">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-xs sm:text-sm">
                        <div className="rich-text" dangerouslySetInnerHTML={{ __html: rt(faq.a) }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    ),
    askQuery: (
      <section className="py-14 bg-muted/40 border-y border-border/50">
        <div className="section-container max-w-4xl">
          <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/60 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-1.5">Didn't find what you were looking for?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send your inquiry directly to our hospital clinical coordinators or request a callback.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow hover:bg-primary/90 transition-all"
            >
              Ask a Medical Query
            </a>
          </div>
        </div>
      </section>
    ),
    emergencyHelpline: (
      <section className="pb-16 pt-4">
        <div className="section-container">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center shadow-elevated">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
              24/7 Patient Emergency Helpline
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto text-sm mb-6">
              For acute assistance, casualty support, or urgent patient admissions, our hotline is active round the clock.
            </p>
            <a
              href="tel:+919582761166"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gold text-navy font-bold shadow-md hover:bg-gold-light transition-all text-sm"
            >
              Emergency Call: +91-9582761166
            </a>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "categoryTabs", "faqSection", "askQuery", "emergencyHelpline"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="faqs"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default PatientFAQs;
