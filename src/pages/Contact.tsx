import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useHospitalData } from "@/hooks/useHospitalData";
import DynamicPageSections from "@/components/DynamicPageSections";

const Contact = () => {
  const { data } = useHospitalData("homepage");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const address = data?.contactAddress || "Ishan Campus, Abhimanyu Crossing, Greater Noida, Gautam Buddh Nagar, UP – 201310";
  const phone = data?.contactPhone || "+91-9582761166";
  const email = data?.contactEmail || "hospital@ishan.ac";
  const opdTimings = data?.opdHours || "Monday – Saturday, 9:00 AM – 4:00 PM";

  const contactInfo = [
    { icon: MapPin, label: "Address", value: address },
    { icon: Phone, label: "Reception", value: phone },
    { icon: Phone, label: "Emergency", value: phone },
    { icon: Mail, label: "Email", value: email },
    { icon: Clock, label: "OPD Timing", value: opdTimings },
    { icon: MessageCircle, label: "WhatsApp", value: phone },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!formData.name || !nameRegex.test(formData.name.trim())) {
      toast.error("Name should only contain alphabets and spaces.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ishan-backend-g096.onrender.com/api";
      const response = await fetch(`${apiBase}/hospital/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || `${formData.phone}@placeholder.com`,
          message: `Subject: ${formData.subject}. ${formData.message}`,
          source: "Contact Page"
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            Patient Services & Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Contact Ishan Ayurvedic Hospital
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            We are here to assist you with OPD appointments, Panchakarma admissions, casualty, or queries.
          </p>
        </div>
      </section>
    ),
    contactCards: (
      <section className="py-12 sm:py-16 bg-muted/30 border-b border-border/50">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-soft items-start">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-foreground leading-relaxed">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    formSection: (
      <section className="py-12 sm:py-20">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <div className="bg-card rounded-3xl p-6 sm:p-10 shadow-elevated border border-border/50">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">Send Us a Direct Message</h2>
                <p className="text-sm text-muted-foreground">Our hospital administration desk responds to all messages within 24 hours</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s.'-]/g, '') })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Subject / Department</label>
                  <input
                    type="text"
                    placeholder="E.g., Panchakarma Inquiry, Medical Certificate, OPD Booking"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Message / Inquiry Details</label>
                  <textarea
                    placeholder="Write your query or message here..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all resize-none"
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl shadow-lg hover:bg-primary/90 transition-all cursor-pointer">
                  {isSubmitting ? "Submitting Message..." : "Submit Message"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    ),
    mapLocation: (
      <section className="py-12 bg-muted/40 border-y border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">Hospital Location & Campus Map</h2>
            <p className="text-sm text-muted-foreground">
              Conveniently located near Pari Chowk, Greater Noida with round-the-clock emergency vehicle access.
            </p>
          </div>
          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden shadow-elevated h-72 sm:h-96 border border-border/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5!2d77.49!3d28.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIshan+Institute!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ishan Ayurvedic Hospital Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    ),
    emergencyBanner: (
      <section className="pb-16 pt-8">
        <div className="section-container">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center shadow-elevated">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
              Immediate Assistance Required?
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto text-sm mb-6">
              Our 24-hour reception and emergency medical officers are on duty 7 days a week.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gold text-navy font-bold shadow-md hover:bg-gold-light transition-all text-sm"
              >
                Call Hospital: {phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "contactCards", "formSection", "mapLocation", "emergencyBanner"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="contact"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default Contact;
