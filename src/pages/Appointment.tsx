import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageGallery from "@/components/PageGallery";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const inputs = target.querySelectorAll('input');
    const nameInput = inputs[0] as HTMLInputElement;
    const phoneInput = inputs[1] as HTMLInputElement;
    const emailInput = inputs[2] as HTMLInputElement;

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!nameInput?.value || !nameRegex.test(nameInput.value.trim())) {
      toast({ variant: "destructive", title: "Invalid Name", description: "Name should only contain alphabets and spaces." });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneInput?.value || !phoneRegex.test(phoneInput.value.trim())) {
      toast({ variant: "destructive", title: "Invalid Phone", description: "Please enter a valid 10-digit phone number." });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailInput?.value && !emailRegex.test(emailInput.value.trim())) {
      toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." });
      return;
    }

    const textarea = target.querySelector('textarea') as HTMLTextAreaElement;
    const deptInput = target.querySelector('[role="combobox"]') as HTMLElement;
    const deptText = deptInput?.textContent || "Unknown Department";

    const data = {
      name: nameInput?.value || "",
      phone: phoneInput?.value || "",
      email: emailInput?.value || `${phoneInput?.value || "unknown"}@placeholder.com`,
      course: deptText,
      message: textarea?.value || "",
      source: "Appointment Page"
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ishan-backend-g096.onrender.com/api";
      const response = await fetch(`${apiBase}/hospital/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }
      setSubmitted(true);
      toast({ title: "Appointment Request Sent", description: "Our team will call you within 2 hours to confirm." });
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast({ variant: "destructive", title: "Booking Failed", description: "Failed to submit appointment request. Please try again." });
    }
  };

  return (
    <Layout>
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            Fill the form below and our counsellor will call you within 2 hours to confirm your appointment.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
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
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-5 sm:p-8 shadow-elevated space-y-5 border border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <Input placeholder="Enter your full name" required onInput={(e: React.FormEvent<HTMLInputElement>) => { e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s.'-]/g, ''); }} />
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
    <PageGallery />
    </Layout>
  );
};

export default Appointment;
