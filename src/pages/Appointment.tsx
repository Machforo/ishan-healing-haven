import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const departments = [
  "Kayachikitsa (General Medicine)",
  "Panchkarma",
  "Prasuti Tantra (Gynaecology)",
  "Kaumarabhritya (Paediatrics)",
  "Shalakya (ENT & Eye)",
  "Shalya (Surgery)",
  "Yoga & Wellness",
  "Pathology & Diagnostics",
  "Pharmacy",
];

const Appointment = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Appointment Request Sent", description: "Our team will call you within 2 hours to confirm." });
  };

  return (
    <Layout>
      <section className="gradient-primary py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Fill the form below and our counsellor will call you within 2 hours to confirm your appointment.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container max-w-3xl">
          {submitted ? (
            <ScrollReveal>
              <div className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-5" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Request Submitted!</h2>
                <p className="text-muted-foreground mb-6">Our team will contact you shortly to confirm your appointment.</p>
                <Button variant="hero" onClick={() => setSubmitted(false)}>Book Another</Button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-elevated space-y-5 border border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <Input placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                    <Input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Department *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Time</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Chief Complaint / Symptoms</label>
                  <Textarea placeholder="Briefly describe your symptoms or reason for visit..." rows={4} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button type="submit" variant="hero" size="lg" className="flex-1">
                    Submit Appointment Request
                  </Button>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Phone className="w-4 h-4" /> WhatsApp Booking
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Walk-in patients welcome during OPD hours: Mon–Sat, 9:00 AM – 4:00 PM
                </p>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Appointment;
