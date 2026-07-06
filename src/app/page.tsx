import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import BestSellers from "@/components/BestSellers";
import ValueProp from "@/components/ValueProp";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Client-side scroll reveal & smooth scroll init */}
      <ScrollReveal />

      {/* Fixed floating navigation */}
      <Header />

      <main>
        <HeroSection />
        <FeaturedCategories />
        <BestSellers />
        <ValueProp />
      </main>

      <Footer />
    </>
  );
}
