'use client'

import { Skill } from '@/types'

interface SkillPopupProps {
	popup: {
		skill: Skill
		x: number
		y: number
	} | null
	popupRef: React.RefObject<HTMLDivElement | null>
}

export default function SkillPopup({ popup, popupRef }: SkillPopupProps) {
	if (!popup) return null

	return (
		<div
			ref={popupRef}
			className='fixed z-50 bg-gray-800 border border-gray-700 rounded-lg p-4 w-64 shadow-xl'
			style={{
				left: `${popup.x}px`,
				top: `${popup.y}px`,
				transform: 'translate(-50%, -100%)',
			}}>
			<h3 className='text-lg font-bold text-light mb-2'>{popup.skill.name}</h3>
			<p className='text-light-80 text-sm mb-3'>{popup.skill.description}</p>
			<a
				href={popup.skill.url}
				target='_blank'
				rel='noopener noreferrer'
				className='text-accent text-sm font-medium hover:underline inline-flex items-center'
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
		</div>
	)
}
