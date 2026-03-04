import { FloatingShapes, CustomCursor, ScrollProgress, SketchyFilter, NotebookBg } from "@/shared/ui";
import { ThemeProvider } from "@/shared/config";
import { Navbar } from "@/widgets/navbar";
import { HeroSection } from "@/widgets/hero-section";
import { AboutSection } from "@/widgets/about-section";
import { SkillsSection } from "@/widgets/skills-section";
import { ProjectsSection } from "@/widgets/projects-section";
import { ContactSection } from "@/widgets/contact-section";
import { Footer } from "@/widgets/footer";
import { ThemeSwitcher } from "@/widgets/theme-switcher";

function HomeContent() {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden relative"
      style={{ fontFamily: "var(--t-font-body)" }}
    >
      <SketchyFilter />
      <NotebookBg />
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
      <ThemeSwitcher />
    </div>
  );
}

export function HomePage() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
