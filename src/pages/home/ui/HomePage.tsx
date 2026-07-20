import { CustomCursor, FloatingShapes, NotebookBg, ScrollProgress, SketchyFilter } from "@/shared/ui";
import { AboutSection } from "@/widgets/about-section";
import { ContactSection } from "@/widgets/contact-section";
import { Footer } from "@/widgets/footer";
import { HeroSection } from "@/widgets/hero-section";
import { Navbar } from "@/widgets/navbar";
import { ProjectsSection } from "@/widgets/projects-section";
import { SkillsSection } from "@/widgets/skills-section";
import { ThemeSwitcher } from "@/widgets/theme-switcher";

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        className="sr-only z-[200] rounded-md bg-background px-4 py-3 text-text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Перейти к содержанию
      </a>
      <SketchyFilter />
      <NotebookBg />
      <FloatingShapes />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
