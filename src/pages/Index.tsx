import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Departments from "@/components/home/Departments";
import PanchkarmaHighlight from "@/components/home/PanchkarmaHighlight";
import DoctorsSection from "@/components/home/DoctorsSection";
import Testimonials from "@/components/home/Testimonials";
import Accreditations from "@/components/home/Accreditations";
import InstitutionalProfile from "@/components/home/InstitutionalProfile";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import LifeAtIshan from "@/components/home/LifeAtIshan";
import DynamicPageSections from "@/components/DynamicPageSections";

const defaultSections = {
  banner: <Hero />,
  stats: <StatsBar />,
  institutionalProfile: <InstitutionalProfile />,
  whyChooseUs: <WhyChooseUs />,
  departments: <Departments />,
  panchkarmaHighlight: <PanchkarmaHighlight />,
  doctors: <DoctorsSection />,
  testimonials: <Testimonials />,
  gallery: <LifeAtIshan />,
  accreditations: <Accreditations />,
};

const defaultOrder = [
  "banner",
  "stats",
  "institutionalProfile",
  "whyChooseUs",
  "departments",
  "panchkarmaHighlight",
  "doctors",
  "testimonials",
  "gallery",
  "accreditations",
];

const Index = () => {
  return (
    <Layout>
      <DynamicPageSections
        pageId="homepage"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default Index;
