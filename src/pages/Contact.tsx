import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { useHospitalData } from "@/hooks/useHospitalData";
import PageGallery from "@/components/PageGallery";

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
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      toast.success("Message sent! We'll get back to you shortly.");
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            Reach us for appointments, enquiries, or directions. We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
                <div className="space-y-5 mb-8">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 rounded-xl p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">How to Reach Us</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We are located near Pari Chowk, Greater Noida. From Pari Chowk Metro Station, take an auto-rickshaw to Ishan Campus (approx. 10 minutes). Ample parking available on campus.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-card rounded-2xl p-5 sm:p-8 shadow-elevated border border-border/50">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name*"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s.'-]/g, '') })}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-lg border border-border/50 bg-background/50 focus:bg-background focus:outline-none focus:ring-2 transition-all resize-none"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-3.5 text-sm font-semibold bg-navy text-primary-foreground rounded-lg shadow-lg hover:bg-navy/90 transition-all">
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal>
            <div className="mt-10 sm:mt-16 rounded-2xl overflow-hidden shadow-elevated h-64 sm:h-80">
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
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
};

export default Contact;
