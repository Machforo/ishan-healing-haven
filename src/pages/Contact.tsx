import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Ishan Campus, Abhimanyu Crossing, Greater Noida, Gautam Buddh Nagar, UP – 201310" },
  { icon: Phone, label: "Reception", value: "+91-XXXXX-XXXXX" },
  { icon: Phone, label: "Emergency", value: "+91-XXXXX-XXXXX" },
  { icon: Mail, label: "Email", value: "hospital@ishan.ac" },
  { icon: Clock, label: "OPD Timing", value: "Monday – Saturday, 9:00 AM – 4:00 PM" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91-XXXXX-XXXXX" },
];

import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await fetch("https://ishan-backend-g096.onrender.com/api/hospital/leads", {
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <Input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <Input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                  <Textarea placeholder="Your Message..." rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  <Button variant="hero" className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
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
    </Layout>
  );
};

export default Contact;
