import { useState } from "react";
import { Shield, Clock, Award, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-hospital.jpg";

const Hero = () => {
  const [form, setForm] = useState({ name: "", phone: "", dept: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    "Kayachikitsa (General Medicine)",
    "Panchkarma OPD",
    "Prasuti (Gynaecology)",
    "Kaumarabhritya (Paediatrics)",
    "Shalakya (ENT & Eye)",
    "Shalya (Surgery)",
    "Yoga & Wellness",
    "Pathology & Diagnostics",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", phone: "", dept: "", message: "" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Ishan Ayurvedic Hospital"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="section-container relative z-10 py-12 sm:py-16 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-14">

          {/* ─── LEFT: Hero Text ─── */}
          <div className="flex-1 flex flex-col justify-center text-left lg:max-w-[55%]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium mb-5 animate-slide-up w-fit">
              <Shield className="w-4 h-4" />
              NCISM Approved Teaching Hospital
            </div>

            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-5 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Holistic Healing Through{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Ancient Ayurveda
              </span>
            </h1>

            <p
              className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed mb-7 max-w-lg animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Experience authentic Panchkarma treatments and expert Ayurvedic
              care at Greater Noida&apos;s premier teaching hospital.
            </p>

            {/* Info chips */}
            <div
              className="flex flex-col sm:flex-row flex-wrap gap-4 animate-slide-up"
              style={{ animationDelay: "0.35s" }}
            >
              {[
                { icon: Clock, label: "OPD Hours", value: "Mon–Sat, 9 AM – 4 PM" },
                { icon: Award, label: "Experience", value: "30+ Years of Trust" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-black/45 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3.5"
                >
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider leading-none mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Enquiry Form ─── */}
          <div
            className="w-full lg:w-[420px] xl:w-[440px] animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-elevated border border-white/20 backdrop-blur-xl">
              {/* Form header */}
              <div className="mb-5">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-tight mb-1">
                  Book a Free Consultation
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60">
                  Our team will contact you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3 animate-slide-up">
                  <CheckCircle className="w-12 h-12 text-primary" />
                  <p className="font-serif text-lg font-semibold text-foreground">
                    Enquiry Received!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Kumar"
                      required
                      className="w-full bg-white/80 border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="w-full bg-white/80 border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">
                      Department
                    </label>
                    <select
                      name="dept"
                      value={form.dept}
                      onChange={handleChange}
                      className="w-full bg-white/80 border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">
                      Brief Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Describe your concern briefly..."
                      className="w-full bg-white/80 border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full py-5 text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-soft"
                  >
                    <Send className="w-4 h-4" />
                    Submit Enquiry
                  </Button>

                  <p className="text-center text-[10px] text-foreground/40 leading-snug">
                    By submitting, you agree to be contacted by Ishan Ayurvedic Hospital.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
