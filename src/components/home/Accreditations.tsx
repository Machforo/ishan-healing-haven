import ScrollReveal from "@/components/ScrollReveal";
import { useHospitalData } from "@/hooks/useHospitalData";

const defaultAccreditations = [
  "NCISM (National Commission for Indian System of Medicine)",
  "CCIM (Central Council of Indian Medicine)",
  "Dr. A.P.J. Abdul Kalam Technical University",
  "Govt. of Uttar Pradesh – DGME",
  "Pharmacy Council of India",
  "UGC Recognised",
];

const Accreditations = () => {
  const { data } = useHospitalData("homepage");
  const list = data?.accreditations?.length > 0 ? data.accreditations : defaultAccreditations;

  const getAccreditationText = (item: any) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item.text || item.name || item.accreditation || JSON.stringify(item);
  };

  return (
    <section className="py-10 sm:py-16 bg-muted/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">
              {data?.accreditationsSubheading || "Trust & Quality"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-4">
              {data?.accreditationsHeading || "Accreditations & Approvals"}
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {list.map((acc: any, i: number) => {
              const text = getAccreditationText(acc);
              return (
                <div
                  key={text || i}
                  className="bg-card rounded-lg px-3 sm:px-5 py-2 sm:py-3 shadow-soft border border-border/50 text-xs sm:text-sm text-foreground/80 font-medium hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  {text}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Accreditations;
