import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Phone, User, MessageSquare } from "lucide-react";

interface ConsultationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  doctorName?: string;
}

export function ConsultationModal({ open, onOpenChange, doctorName }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const target = e.currentTarget;
    const nameInput = target.querySelector('#name') as HTMLInputElement;
    const phoneInput = target.querySelector('#phone') as HTMLInputElement;
    const messageInput = target.querySelector('#message') as HTMLTextAreaElement;

    const data = {
      name: nameInput?.value || "",
      phone: phoneInput?.value || "",
      email: `${phoneInput?.value || "unknown"}@placeholder.com`,
      message: messageInput?.value || "",
      course: doctorName || "General Consultation",
      source: "Consultation Modal"
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/hospital/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to book consultation");
      }
      toast.success("Consultation Request Sent!", {
        description: "Our healthcare coordinator will call you shortly to confirm your slot.",
      });
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Book a Consultation</DialogTitle>
          <DialogDescription>
            {doctorName
              ? `Fill in the details to request an appointment with ${doctorName}.`
              : "Experience authentic Ayurvedic healing. Leave your details and we'll get back to you."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" /> Full Name
            </Label>
            <Input id="name" placeholder="Enter your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" /> Phone Number
            </Label>
            <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" /> Health Concern (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Briefly describe your health concern..."
              className="resize-none h-24"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Sending Request..." : "Request Appointment"}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            By submitting, you agree to our privacy policy and consent to receive a call back.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Global hook/logic for timed popup
export function useTimedConsultationPopup(delayMinutes = 0.25) { // default 15 seconds for demo
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenConsultationPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenConsultationPopup", "true");
      }, delayMinutes * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [delayMinutes]);

  return { isOpen, setIsOpen };
}
