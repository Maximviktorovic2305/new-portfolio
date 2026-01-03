'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'
import { useAnimation } from '@/contexts/AnimationContext'
import { useCardTilt } from '@/hooks'

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
	const { settings } = useAnimation()
	const maxTilt =
		settings.intensity === 'subtle'
			? 5
			: settings.intensity === 'moderate'
			? 8
			: 11
	const { tilt, cardRef, handleMouseMove, handleMouseLeave } = useCardTilt({
		maxTilt,
	})
	const hoverMotion = settings.enabled ? { y: -6, scale: 1.03 } : {}

	return (
		<motion.div
			key={skill.name}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			whileHover={hoverMotion}
			className='relative'
			onMouseEnter={(e) => onHover(skill, e)}
			onClick={(e) => onClick(skill, e)}>
			<div
				ref={cardRef}
				data-anim={settings.enabled}
				className='card-surface card-surface--compact skill-card rounded-lg p-4 text-center cursor-pointer transition-all duration-300'
				onMouseMove={settings.enabled ? handleMouseMove : undefined}
				onMouseLeave={settings.enabled ? handleMouseLeave : undefined}
				style={{
					transform: settings.enabled
						? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
						: 'none',
					transition: settings.enabled ? 'transform 0.12s ease-out' : 'none',
					transformStyle: 'preserve-3d',
				}}>
				<div className='card-grid' aria-hidden='true' />
				<div className='card-shine' aria-hidden='true' />
				<span className='relative z-10 text-light text-sm font-medium'>
					{skill.name}
				</span>
			</div>
		</motion.div>
	)
}
