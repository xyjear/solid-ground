import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TimelineSection from "@/components/TimelineSection";
import ReviewsSection from "@/components/ReviewsSection";
import CalculatorSection from "@/components/CalculatorSection";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TimelineSection />
      <ReviewsSection />
      <CalculatorSection />
      <MapSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
