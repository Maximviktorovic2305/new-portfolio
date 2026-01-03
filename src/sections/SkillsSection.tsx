'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
		placement: 'top' | 'bottom'
		width: number
		height: number
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
		const viewportPadding = 12
		const popupWidth = 256
		const popupHeight = 160
		const effectiveWidth = Math.max(
			180,
			Math.min(popupWidth, window.innerWidth - viewportPadding * 2),
		)
		const effectiveHeight = Math.max(
			120,
			Math.min(popupHeight, window.innerHeight - viewportPadding * 2),
		)
		const left = Math.min(
			Math.max(rect.left + rect.width / 2 - effectiveWidth / 2, viewportPadding),
			window.innerWidth - viewportPadding - effectiveWidth,
		)
		const spaceAbove = rect.top - viewportPadding
		const spaceBelow = window.innerHeight - rect.bottom - viewportPadding
		const gap = 12
		let placement: 'top' | 'bottom' = 'top'

		if (spaceAbove >= effectiveHeight + gap) {
			placement = 'top'
		} else if (spaceBelow >= effectiveHeight + gap) {
			placement = 'bottom'
		} else {
			placement = spaceAbove > spaceBelow ? 'top' : 'bottom'
		}

		let top = placement === 'top'
			? rect.top - gap - effectiveHeight
			: rect.bottom + gap

		if (placement === 'top') {
			top = Math.max(top, viewportPadding)
		} else {
			top = Math.min(
				top,
				window.innerHeight - viewportPadding - effectiveHeight,
			)
		}

		setPopup({
			skill,
			x: left,
			y: top,
			placement,
			width: effectiveWidth,
			height: effectiveHeight,
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
				<AnimatePresence>
					<SkillPopup popup={popup} popupRef={popupRef} />
				</AnimatePresence>
			</div>
		</section>
	)
}
