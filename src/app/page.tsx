import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import SkillsSection from '@/sections/SkillsSection'
import ContactSection from '@/sections/ContactSection'
import AnimationShowcase from '@/sections/AnimationShowcase'
import TestTiltCard from '@/components/TestTiltCard'

export default function Home() {
	return (
		<div>
			<HeroSection />
			<AnimationShowcase />
			<AboutSection />
			<ProjectsSection />
			<SkillsSection />
			<ContactSection />
			<TestTiltCard />
		</div>
	)
}
