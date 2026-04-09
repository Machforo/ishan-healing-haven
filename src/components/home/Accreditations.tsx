import ScrollReveal from "@/components/ScrollReveal";

const accreditations = [
  "NCISM (National Commission for Indian System of Medicine)",
  "CCIM (Central Council of Indian Medicine)",
  "Dr. A.P.J. Abdul Kalam Technical University",
  "Govt. of Uttar Pradesh – DGME",
  "Pharmacy Council of India",
  "UGC Recognised",
];

const Accreditations = () => {
  return (
    <section className="py-10 sm:py-16 bg-muted/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Trust & Quality</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-4">
              Accreditations & Approvals
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {accreditations.map((acc) => (
              <div
                key={acc}
                className="bg-card rounded-lg px-3 sm:px-5 py-2 sm:py-3 shadow-soft border border-border/50 text-xs sm:text-sm text-foreground/80 font-medium hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                {acc}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Accreditations;
