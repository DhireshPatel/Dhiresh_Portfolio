import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Journey from "@/components/Journey";
import CurrentFocus from "@/components/CurrentFocus";
import GetInTouch from "@/components/GetInTouch";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Dhiresh — Frontend Developer",
  description:
    "I build modern, interactive and high-performance web experiences using React, Next.js and JavaScript.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Skills />
      <FeaturedProjects />
      <Journey />
      <CurrentFocus />
      <GetInTouch />
      <CTA />
    </>
  );
}
