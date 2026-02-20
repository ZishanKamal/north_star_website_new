import { Hero } from "@/components/home/hero";
import { Methodology } from "@/components/home/methodology";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CoursesSection } from "@/components/home/courses-section";
import { Statistics } from "@/components/home/statistics";
import { LatestBlogs } from "@/components/home/latest-blogs";

export default function Home() {
  return (
    <>
      <Hero />
      <Methodology />
      <WhyChooseUs />
      <CoursesSection />
      <Statistics />
      <LatestBlogs />
    </>
  );
}
