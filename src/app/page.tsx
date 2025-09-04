import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ContactSection from "@/sections/ContactSection";
import AnimationShowcase from "@/sections/AnimationShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AnimationShowcase />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
