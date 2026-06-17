import ScrollReveal from "@/components/ScrollReveal";
import { useHospitalData } from "@/hooks/useHospitalData";

const defaultImages = [];

const LifeAtIshan = () => {
  const { data } = useHospitalData("homepage");
  const gallery = data?.gallery?.length > 0 ? data.gallery : (data?.lifeAtIshan?.length > 0 ? data.lifeAtIshan : defaultImages);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wider">Campus & Facilities</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">
              Life at Ishan
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((item: any, i: number) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="rounded-xl overflow-hidden shadow-soft aspect-square group relative">
                <img 
                  src={item.image} 
                  alt="Life at Ishan" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAtIshan;
