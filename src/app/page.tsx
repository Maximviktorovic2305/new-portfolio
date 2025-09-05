import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import SkillsSection from '@/sections/SkillsSection'
import ContactSection from '@/sections/ContactSection'
import AnimationShowcase from '@/sections/AnimationShowcase'

export default function Home() {
	return (
		<div>
			<HeroSection />
			<AnimationShowcase />
			<AboutSection />
			<ProjectsSection />
			<SkillsSection />
			<ContactSection />
		</div>
	)
}
