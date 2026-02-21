import Hero from "@/components/home/hero";
import PartnerCarousel from "@/components/home/partner-carousel";
import ApproachOverview from "@/components/home/approach-overview";
import InstitutionalPrograms from "@/components/home/institutional-programs";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import OpenProgramsPreview from "@/components/home/open-programs-preview";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerCarousel />
      <ApproachOverview />
      <InstitutionalPrograms />
      <TestimonialCarousel />
      <OpenProgramsPreview />
      <CTASection />
    </>
  );
}
