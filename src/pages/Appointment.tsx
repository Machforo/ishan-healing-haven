import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DynamicPageSections from "@/components/DynamicPageSections";

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

      if (response.ok) {
        setSubmitted(true);
        toast({ title: "Appointment Requested!", description: "We will contact you shortly to confirm." });
      } else {
        toast({ variant: "destructive", title: "Submission Failed", description: "Failed to submit appointment request. Please try again." });
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast({ variant: "destructive", title: "Booking Failed", description: "Failed to submit appointment request. Please try again." });
    }
  };

  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            Quick Clinical Consultation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            Schedule an in-person OPD consultation or Nadi Pariksha examination with our senior Ayurvedic doctors.
          </p>
        </div>
      </section>
    ),
    quickHelp: (
      <section className="py-8 bg-muted/40 border-b border-border/50">
        <div className="section-container max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border/50 shadow-soft flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Immediate Assistance</p>
                <p className="font-bold text-foreground text-sm">Call Hospital Desk</p>
              </div>
              <a
                href="tel:+919582761166"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all"
              >
                +91-9582761166
              </a>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/50 shadow-soft flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">WhatsApp Desk</p>
                <p className="font-bold text-foreground text-sm">Chat with Coordinator</p>
              </div>
              <a
                href="https://wa.me/919582761166"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Instant Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    ),
    formSection: (
      <section className="py-12 sm:py-20">
        <div className="section-container max-w-3xl">
          {submitted ? (
            <ScrollReveal>
              <div className="text-center py-16 bg-card rounded-2xl border border-border/50 shadow-elevated p-8">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-5" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Request Submitted!</h2>
                <p className="text-muted-foreground mb-6">Our team will contact you shortly to confirm your appointment time and doctor slot.</p>
                <Button variant="hero" onClick={() => setSubmitted(false)}>Book Another Appointment</Button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 sm:p-10 shadow-elevated space-y-5 border border-border/50">
                <div className="border-b border-border/50 pb-4 mb-2">
                  <h3 className="font-serif text-xl font-bold text-foreground">Patient Information</h3>
                  <p className="text-xs text-muted-foreground">Please fill in patient details for quick hospital file registration</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <Input placeholder="Enter patient's full name" required onInput={(e: React.FormEvent<HTMLInputElement>) => { e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s.'-]/g, ''); }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                    <Input type="tel" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Department / Speciality *</label>
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Time Slot</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Chief Complaint / Symptoms</label>
                  <Textarea placeholder="Briefly describe your health condition or symptoms..." rows={4} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button type="submit" variant="hero" size="lg" className="flex-1 font-bold">
                    Submit Appointment Request
                  </Button>
                  <a
                    href="https://wa.me/919582761166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" /> WhatsApp Booking
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  Walk-in patients welcome during OPD hours: Mon–Sat, 9:00 AM – 4:00 PM
                </p>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    ),
    guidelines: (
      <section className="py-14 bg-muted/40 border-y border-border/50">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Instructions for Your Visit</h3>
            <p className="text-sm text-muted-foreground">Please review these basic recommendations prior to your pulse diagnosis appointment</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3 text-sm">
                1
              </div>
              <h4 className="font-serif font-bold text-foreground text-base mb-1">Nadi Pariksha Prep</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For accurate pulse diagnosis, please avoid heavy meals, caffeine, or strenuous exercise for 2.5 hours prior.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3 text-sm">
                2
              </div>
              <h4 className="font-serif font-bold text-foreground text-base mb-1">Medical Reports</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Carry any existing blood tests, imaging (X-ray, MRI, ultrasound), and current prescription medicines.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3 text-sm">
                3
              </div>
              <h4 className="font-serif font-bold text-foreground text-base mb-1">Arrival Time</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Arrive 15 minutes before your time slot to complete initial vitals check at the reception desk.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    opdHoursCard: (
      <section className="pb-16 pt-8">
        <div className="section-container max-w-4xl">
          <div className="gradient-primary rounded-3xl p-8 sm:p-10 text-center shadow-elevated">
            <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-2">Hospital OPD Timings</h3>
            <p className="text-primary-foreground/80 text-sm max-w-lg mx-auto mb-4">
              Monday to Saturday: 9:00 AM – 4:00 PM | Casualty & Emergency: 24x7
            </p>
            <p className="text-xs text-white/70">
              Address: Ishan Campus, Abhimanyu Crossing, Knowledge Park I, Greater Noida, UP – 201310
            </p>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "quickHelp", "formSection", "guidelines", "opdHoursCard"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="appointment"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default Appointment;
