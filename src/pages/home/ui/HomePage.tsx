import { FloatingShapes, CustomCursor, ScrollProgress } from "@/shared/ui";
import { Navbar } from "@/widgets/navbar";
import { HeroSection } from "@/widgets/hero-section";
import { AboutSection } from "@/widgets/about-section";
import { SkillsSection } from "@/widgets/skills-section";
import { ProjectsSection } from "@/widgets/projects-section";
import { ContactSection } from "@/widgets/contact-section";
import { Footer } from "@/widgets/footer";

export function HomePage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden relative"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <FloatingShapes />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}