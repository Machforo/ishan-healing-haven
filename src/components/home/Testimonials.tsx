import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajiv Mehta",
    treatment: "Panchkarma Therapy",
    quote:
      "After years of chronic back pain, the Basti therapy at Ishan Hospital gave me incredible relief. The doctors were thorough and caring throughout my treatment.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Greater Noida",
  },
  {
    name: "Sunita Devi",
    treatment: "Kayachikitsa – Diabetes Management",
    quote:
      "My blood sugar levels have stabilised significantly after Ayurvedic treatment here. The personalised diet plan and medicines made a real difference.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Noida",
  },
  {
    name: "Amit Verma",
    treatment: "Shalya – Ksharasutra",
    quote:
      "I was scared of surgery for fistula, but the Ksharasutra procedure was minimally invasive with quick recovery. Highly recommend this hospital.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Delhi",
  },
  {
    name: "Priya Sharma",
    treatment: "Yoga & Wellness",
    quote:
      "The therapeutic yoga sessions helped me manage my anxiety and sleep issues naturally. The instructors are knowledgeable and supportive.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Ghaziabad",
  },
  {
    name: "Mohan Lal",
    treatment: "Nasya – Sinus Treatment",
    quote:
      "Suffered from chronic sinusitis for 10 years. After Nasya therapy at Ishan, I breathe freely again. Truly life-changing Ayurvedic care.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    location: "Greater Noida",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((index + testimonials.length) % testimonials.length);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              Patient Stories
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Real experiences from patients who found healing through Ayurveda at our hospital.
            </p>
          </div>
        </ScrollReveal>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          {/* Card */}
          <div
            className={`bg-card rounded-2xl shadow-elevated border border-border/50 p-8 sm:p-10 transition-opacity duration-300 ${
              animating ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Quote icon */}
            <Quote className="w-10 h-10 text-primary/10 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote text */}
            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed italic mb-8">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author row */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover object-top border-2 border-primary/20 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=120&background=145428&color=fff`;
                }}
              />
              <div>
                <div className="font-semibold text-foreground text-base">{t.name}</div>
                <div className="text-xs text-primary font-medium mt-0.5">{t.treatment}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.location}</div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-border bg-card shadow-soft flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/70" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-border hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-border bg-card shadow-soft flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {testimonials.map((person, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                title={person.name}
                className={`rounded-full border-2 transition-all duration-300 ${
                  i === current
                    ? "border-primary scale-110 shadow-soft"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=80&background=145428&color=fff`;
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
