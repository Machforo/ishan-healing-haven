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

const Contact = () => {
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input type="tel" placeholder="Phone Number" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message..." rows={4} />
                  <Button variant="hero" className="w-full" size="lg">Send Message</Button>
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
