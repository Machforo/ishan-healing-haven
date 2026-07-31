import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Baby, Eye, Scissors, Dumbbell, FlaskConical, Pill, Heart } from "lucide-react";
import { useHospitalData } from "@/hooks/useHospitalData";
import PageGallery from "@/components/PageGallery";

interface DepartmentType {
  icon: any;
  name: string;
  subtitle: string;
  path: string;
  desc?: string;
  description?: string;
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

  // Determine actual departments list based on api response structure
  let departmentsData: DepartmentType[] = defaultDepartments;
  if (Array.isArray(data) && data.length > 0) {
    departmentsData = data;
  } else if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    departmentsData = data.data;
  } else if (data?.departments && Array.isArray(data.departments) && data.departments.length > 0) {
    departmentsData = data.departments;
  }

  return (
    <Layout>
      <section className="gradient-primary py-12 sm:py-20">
        <div className="section-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {homeData?.departmentsHeading || "Our Departments"}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base sm:text-lg">
            {homeData?.departmentsSubheading || "9 specialised OPD departments providing comprehensive Ayurvedic healthcare."}
          </p>
        </div>
      </section>

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
                <ScrollReveal key={dept.name} delay={i * 80}>
                  <Link to={dept.path || `/departments/${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="group block bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 h-full">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{dept.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{dept.subtitle || ""}</p>
                    <p className="text-sm text-muted-foreground mb-4">{dept.desc || dept.description || ""}</p>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
};

export default DepartmentsPage;
