import Hero from "@/components/home/hero";
import ProgramShowcase from "@/components/home/program-showcase";
import PartnerCarousel from "@/components/home/partner-carousel";
import ApproachOverview from "@/components/home/approach-overview";
import IndustryStats from "@/components/home/industry-stats";
import TestimonialCarousel from "@/components/home/testimonial-carousel";
import BlogCarousel from "@/components/home/blog-carousel";
import AppointmentBooking from "@/components/home/appointment-booking";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramShowcase />
      <PartnerCarousel />
      <IndustryStats />
      <ApproachOverview />
      <TestimonialCarousel />
      <BlogCarousel />
      <AppointmentBooking />
      <CTASection />
    </>
  );
}
