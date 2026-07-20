import { AmbientScrollbar } from "@/shared/ui";
import { AboutSection } from "@/widgets/about-section";
import { ContactSection } from "@/widgets/contact-section";
import { Footer } from "@/widgets/footer";
import { HeroSection } from "@/widgets/hero-section";
import { Navbar } from "@/widgets/navbar";
import { ProjectsSection } from "@/widgets/projects-section";
import { SkillsSection } from "@/widgets/skills-section";

export function HomePage() {
  return (
    <div className="immersive-site">
      <a className="immersive-skip-link" href="#main-content">
        Перейти к содержанию
      </a>
      <AmbientScrollbar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
