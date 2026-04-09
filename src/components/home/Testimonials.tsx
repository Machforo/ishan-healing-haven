import ScrollReveal from "@/components/ScrollReveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajiv Mehta",
    treatment: "Panchkarma Therapy",
    quote: "After years of chronic back pain, the Basti therapy at Ishan Hospital gave me incredible relief. The doctors were thorough and caring throughout my treatment.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    treatment: "Kayachikitsa – Diabetes Management",
    quote: "My blood sugar levels have stabilised significantly after Ayurvedic treatment here. The personalised diet plan and medicines made a real difference.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    treatment: "Shalya – Ksharasutra",
    quote: "I was scared of surgery for fistula, but the Ksharasutra procedure was minimally invasive with quick recovery. Highly recommend this hospital.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    treatment: "Yoga & Wellness",
    quote: "The therapeutic yoga sessions helped me manage my anxiety and sleep issues naturally. The instructors are knowledgeable and supportive.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Patient Stories</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real experiences from patients who found healing through Ayurveda at our hospital.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-primary">{t.treatment}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
