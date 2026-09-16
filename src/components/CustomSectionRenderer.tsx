import PageGallery from "@/components/PageGallery";
import { SectionLayoutItem } from "@/hooks/usePageLayout";
import { rt } from "@/lib/richText";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CustomSectionRenderer({ section }: { section: SectionLayoutItem }) {
  if (section.isHidden) return null;

  // 1. Raw / Custom Dangerous HTML template
  if (section.type === "custom_html" || (!section.type && section.htmlContent)) {
    const rawHtml = section.htmlContent || "";
    if (!rawHtml.trim()) return null;

    if (typeof window !== 'undefined') {
      if (!(window as any).__renderedCustomHtmls) {
        (window as any).__renderedCustomHtmls = new Set();
      }
      (window as any).__renderedCustomHtmls.add(rawHtml.replace(/\s+/g, ' ').trim());
    }

    return (
      <section className="page-custom-section py-6">
        <div
          className="rich-text w-full"
          dangerouslySetInnerHTML={{ __html: rt(rawHtml) }}
        />
      </section>
    );
  }

  // 2. Hero / Banner Strip
  if (section.type === "hero") {
    return (
      <section className="relative py-20 sm:py-28 overflow-hidden gradient-primary text-primary-foreground">
        {section.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={section.image}
              alt={section.heading || "Banner"}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
        )}

        <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-primary-foreground/90 uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {section.description}
              </p>
            )}
            {section.htmlContent && (
              <div
                className="rich-text text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-left"
                dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
              />
            )}
            {section.ctaText && (
              <Link to={section.ctaLink || "/appointment"}>
                <Button variant="hero" size="lg" className="px-8 shadow-elevated">
                  {section.ctaText}
                </Button>
              </Link>
            )}
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // 3. Content & Image Split
  if (section.type === "split") {
    return (
      <section className="py-16 sm:py-24 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <ScrollReveal>
                {section.subheading && (
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase block mb-3">
                    {section.subheading}
                  </span>
                )}
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  {section.heading || section.name}
                </h2>
                {section.description && (
                  <p className="text-muted-foreground leading-relaxed text-base mb-6">
                    {section.description}
                  </p>
                )}
                {section.htmlContent && (
                  <div
                    className="rich-text text-muted-foreground leading-relaxed text-base mb-6"
                    dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
                  />
                )}
                {section.ctaText && (
                  <Link to={section.ctaLink || "/appointment"}>
                    <Button variant="default" size="lg">
                      {section.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </ScrollReveal>
            </div>

            {section.image && (
              <div className="md:col-span-5">
                <ScrollReveal delay={200}>
                  <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border/60">
                    <img
                      src={section.image}
                      alt={section.heading || "Feature Image"}
                      className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 4. Feature Cards Grid
  if (section.type === "cards") {
    const cardItems = Array.isArray(section.items) && section.items.length > 0
      ? section.items
      : [
          { title: "Personalized Regimens", desc: "Tailored treatments based on Prakriti and pulse diagnosis." },
          { title: "Pure Ayurvedic Medicines", desc: "Authentic classical herbal formulations tested for safety." },
          { title: "Expert Vaidyas", desc: "Qualified practitioners with decades of clinical experience." }
        ];

    return (
      <section className="py-16 sm:py-24 bg-muted/30 border-y border-border/40">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-muted-foreground mt-3 text-sm sm:text-base">
                {section.description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardItems.map((item: any, i: number) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="h-full flex flex-col p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {item.title || item.heading}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {item.desc || item.description || item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {section.ctaText && (
            <div className="text-center mt-12">
              <Link to={section.ctaLink || "/appointment"}>
                <Button variant="default" size="lg">
                  {section.ctaText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 5. Call to Action (CTA) Strip
  if (section.type === "cta") {
    return (
      <section className="py-16 sm:py-20 gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="section-container text-center max-w-3xl mx-auto relative z-10">
          <ScrollReveal>
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-primary-foreground/80 uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 leading-relaxed">
                {section.description}
              </p>
            )}
            <Link to={section.ctaLink || "/appointment"}>
              <Button variant="hero" size="lg" className="px-8 shadow-elevated">
                {section.ctaText || "Book Your Consultation"}
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // 6. FAQ Accordion
  if (section.type === "faq") {
    const faqList = Array.isArray(section.items) && section.items.length > 0 ? section.items : [];

    return (
      <section className="py-16 sm:py-24 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-muted-foreground mt-2">{section.description}</p>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqList.map((faq: any, i: number) => (
              <AccordionItem key={i} value={`custom-faq-${i}`} className="bg-card rounded-xl border border-border/50 shadow-soft px-5">
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                  {faq.q || faq.question || faq.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: rt(faq.a || faq.answer || faq.desc || "") }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }

  // Fallback: render any custom HTML if present
  if (section.htmlContent) {
    return (
      <section className="py-8">
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }} />
      </section>
    );
  }

  
  // Gallery Section (Inline custom or built-in)
  if (section.type === "gallery" || section.id === "gallery" || section.id === "page_gallery" || section.id.includes("gallery")) {
    return <PageGallery isInline={true} images={section.items} title={section.heading || section.name} />;
  }

  return null;
}
