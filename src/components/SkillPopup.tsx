'use client'

import { Skill } from '@/types'
import { motion } from 'framer-motion'

interface SkillPopupProps {
	popup: {
		skill: Skill
		x: number
		y: number
		placement: 'top' | 'bottom'
		width: number
		height: number
	} | null
	popupRef: React.RefObject<HTMLDivElement | null>
}

export default function SkillPopup({ popup, popupRef }: SkillPopupProps) {
	if (!popup) return null

	return (
		<motion.div
			ref={popupRef}
			className='skill-popup fixed z-[70] rounded-lg p-4 shadow-xl'
			initial={{ opacity: 0, y: 8, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 6, scale: 0.98 }}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			style={{
				left: `${popup.x}px`,
				top: `${popup.y}px`,
				width: `${popup.width}px`,
			}}>
			<h3 className='text-lg font-bold text-light mb-2'>{popup.skill.name}</h3>
			<p className='text-light-80 text-sm mb-3'>{popup.skill.description}</p>
			<a
				href={popup.skill.url}
				target='_blank'
				rel='noopener noreferrer'
				className='text-accent text-sm font-medium hover:underline inline-flex items-center cursor-pointer'
				onClick={(e) => e.stopPropagation()}>
				Перейти к документации
				<svg
					className='w-4 h-4 ml-1'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
					/>
				</svg>
			</a>
		</motion.div>
	)
}
