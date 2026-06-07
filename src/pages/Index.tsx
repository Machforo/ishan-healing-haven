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

const Index = () => {
  return (
    <Layout>
      <Hero />
      <StatsBar />
      <InstitutionalProfile />
      <WhyChooseUs />
      <Departments />
      <PanchkarmaHighlight />
      <DoctorsSection />
      <Testimonials />
      <LifeAtIshan />
      <Accreditations />
    </Layout>
  );
};

export default Index;
