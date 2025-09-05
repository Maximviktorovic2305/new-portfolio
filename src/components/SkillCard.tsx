'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'

interface SkillCardProps {
	skill: Skill
	index: number
	onHover: (skill: Skill, event: React.MouseEvent) => void
	onClick: (skill: Skill, event: React.MouseEvent) => void
}

export default function SkillCard({
	skill,
	index,
	onHover,
	onClick,
}: SkillCardProps) {
	return (
		<motion.div
			key={skill.name}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			className='relative'
			onMouseEnter={(e) => onHover(skill, e)}
			onClick={(e) => onClick(skill, e)}>
			<div className='bg-gray-800 hover:bg-gray-750 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 border border-gray-700 hover:border-accent'>
				<span className='text-light text-sm font-medium'>{skill.name}</span>
			</div>
		</motion.div>
	)
}
