import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Baby, Eye, Scissors, Dumbbell, FlaskConical, Pill, Heart } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";
import DynamicPageSections from "@/components/DynamicPageSections";

interface DepartmentType {
  icon: any;
  name: string;
  subtitle: string;
  path: string;
  desc?: string;
  description?: string;
  color?: string;
  category?: string;
}

const defaultDepartments: DepartmentType[] = [
  {
    icon: Leaf,
    name: "Kayachikitsa",
    subtitle: "General Medicine",
    path: "/departments/kayachikitsa",
    color: "from-emerald-500 to-teal-500",
    category: "Medicine",
    description: "General medicine dealing with diagnosis and treatment of systemic diseases."
  },
  {
    icon: Heart,
    name: "Panchakarma",
    subtitle: "Detoxification & Rejuvenation",
    path: "/departments/panchakarma",
    color: "from-rose-500 to-pink-500",
    category: "Therapy",
    description: "Specialised department for detoxification and rejuvenation therapies."
  },
  {
    icon: Scissors,
    name: "Shalya Tantra",
    subtitle: "Ayurvedic Surgery",
    path: "/departments/shalya",
    color: "from-blue-500 to-indigo-500",
    category: "Surgery",
    description: "Ayurvedic surgery department managing anorectal and other surgical issues."
  },
  {
    icon: Baby,
    name: "Prasuti & Stri Roga",
    subtitle: "Gynecology & Obstetrics",
    path: "/departments/prasuti",
    color: "from-amber-500 to-orange-500",
    category: "Medicine",
    description: "Obstetrics and gynaecology offering holistic maternity care."
  }
];

const iconMap: Record<string, any> = {
  Heart,
  Leaf,
  Baby,
  Eye,
  Scissors,
  Dumbbell,
  FlaskConical,
  Pill
};

const DepartmentsPage = () => {
  const { data } = useHospitalData("departments");
  const { data: homeData } = useHospitalData("homepage");

  let departmentsData: DepartmentType[] = defaultDepartments;
  if (Array.isArray(data) && data.length > 0) {
    departmentsData = data;
  } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    departmentsData = data.data;
  } else if (data?.departments && Array.isArray(data.departments) && data.departments.length > 0) {
    departmentsData = data.departments;
  }

  const defaultSections = {
    header: (
      <section className="gradient-primary py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-primary-foreground text-xs font-semibold tracking-wider uppercase mb-3">
            Comprehensive Clinical Care
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {homeData?.departmentsHeading || "Our Clinical Departments"}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {homeData?.departmentsSubheading || "Specialised Ayurvedic OPD and IPD departments delivering evidence-based classical therapeutics."}
          </p>
        </div>
      </section>
    ),
    departmentList: (
      <section className="py-12 sm:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.map((dept: any, i: number) => {
              const defaultIdx = defaultDepartments.length > 0 ? i % defaultDepartments.length : 0;
              let Icon = defaultDepartments[defaultIdx]?.icon || Leaf;
              if (dept.icon) {
                if (typeof dept.icon === "string") {
                  Icon = iconMap[dept.icon] || Icon;
                } else {
                  Icon = dept.icon;
                }
              }

              return (
                <ScrollReveal key={dept.name || i} delay={i * 80}>
                  <Link to={dept.path || `/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{dept.name}</h3>
                      <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{dept.subtitle || ""}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{dept.desc || dept.description || ""}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all pt-3 border-t border-border/40">
                      Explore Department Care <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    ),
    facilitiesOverview: (
      <section className="py-14 bg-muted/40 border-y border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Diagnostic & Clinical Infrastructure
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Every department is supported by modern pathology labs, imaging, sterile treatment suites, and in-house herbal dispensaries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-base mb-1.5">Pathology Lab</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Biochemical, hematology, and microbiological tests available for diagnostic validation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-base mb-1.5">Panchakarma Units</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Separate male and female therapy suites equipped with wooden Dronis and steam boxes.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-base mb-1.5">Ksharasutra Theatre</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dedicated minor surgical unit for anorectal conditions (fistula, piles, pilonidal sinus).
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border/50 shadow-soft">
              <h4 className="font-serif font-bold text-foreground text-base mb-1.5">Dispensary & Pharmacy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                24x7 supply of authentic classical churnas, asavas, arishtas, and custom herbal decoctions.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    holisticBenefits: (
      <section className="py-14 sm:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
                🌿
              </div>
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Pure Classical Formulations</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Prepared adhering to Charaka & Sushruta guidelines with heavy-metal screening.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
                🩺
              </div>
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Personalised Nadi Pariksha</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Pulse diagnosis identifies Dosha imbalances (Vata, Pitta, Kapha) before symptoms manifest.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">
                🥗
              </div>
              <h4 className="font-serif font-bold text-foreground text-lg mb-2">Pathya & Diet Counseling</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Custom therapeutic dietary and lifestyle protocols provided for permanent health restoration.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    cta: (
      <section className="pb-16 pt-4">
        <div className="section-container text-center">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center shadow-elevated">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Consult a Specialist Vaidya Today
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm sm:text-base mb-6">
              Book a personal consultation with senior department heads for specialized treatment plans.
            </p>
            <Link to="/appointment">
              <Button variant="gold" size="lg" className="font-bold shadow-md">
                Schedule Department Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  };

  const defaultOrder = ["header", "departmentList", "facilitiesOverview", "holisticBenefits", "cta"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="departments"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default DepartmentsPage;
