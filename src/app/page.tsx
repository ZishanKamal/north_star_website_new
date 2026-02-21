import Hero from "@/components/home/hero";
import ProgramShowcase from "@/components/home/program-showcase";
import PartnerCarousel from "@/components/home/partner-carousel";
import ApproachOverview from "@/components/home/approach-overview";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramShowcase />
      <PartnerCarousel />
      <ApproachOverview />
      <TestimonialCarousel />
      <CTASection />
    </>
  );
}
