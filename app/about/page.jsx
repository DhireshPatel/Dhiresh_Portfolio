import AboutHero from "@/components/AboutHero";
import WhatIDo from "@/components/WhatIDo";
import TechStack from "@/components/TechStack";
import MyApproach from "@/components/MyApproach";
import Journey from "@/components/Journey";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About",
  description:
    "Learn more about Dhiresh — a frontend developer focused on clean code, responsive design and interactive web experiences.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhatIDo />
      <TechStack />
      <MyApproach />
      <Journey />
      <CTA />
    </>
  );
}
