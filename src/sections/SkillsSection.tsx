'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Skill } from '@/types'
import SkillCard from '@/components/SkillCard'
import SkillPopup from '@/components/SkillPopup'
import SkillTabs from '@/components/SkillTabs'
import { skills } from '@/data'

export default function SkillsSection() {
	const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend'>('Frontend')
	const [popup, setPopup] = useState<{
		skill: Skill
		x: number
		y: number
	} | null>(null)
	const popupRef = useRef<HTMLDivElement>(null)
	const sectionRef = useRef<HTMLElement>(null)

	// Close popup when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node)
			) {
				setPopup(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const filteredSkills = skills.filter((skill) => skill.category === activeTab)

	const handleSkillHover = (skill: Skill, event: React.MouseEvent) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setPopup({
			skill,
			x: rect.left + rect.width / 2,
			y: rect.top - 10,
		})
	}

	const handleSkillClick = (skill: Skill, event: React.MouseEvent) => {
		event.stopPropagation()
		window.open(skill.url, '_blank')
	}

	const handleSectionLeave = () => {
		// Close all popups when leaving the section
		setPopup(null)
	}

	return (
		<section
			id='skills'
			className='py-20 bg-gray-900 relative'
			ref={sectionRef}
			onMouseLeave={handleSectionLeave}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-light mb-4'>
						Мои <span className='text-accent'>навыки</span>
					</h2>
					<div className='w-20 h-1 bg-accent mx-auto'></div>
				</motion.div>

				{/* Tab Navigation */}
				<SkillTabs activeTab={activeTab} onTabChange={setActiveTab} />

				{/* Skills Grid */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
					{filteredSkills.map((skill, index) => (
						<SkillCard
							key={skill.name}
							skill={skill}
							index={index}
							onHover={handleSkillHover}
							onClick={handleSkillClick}
						/>
					))}
				</div>

				{/* Popup */}
				<SkillPopup popup={popup} popupRef={popupRef} />
			</div>
		</section>
	)
}
