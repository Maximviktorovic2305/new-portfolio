'use client'

import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

interface ContactInfoItemProps {
	icon: React.ReactNode
	title: string
	content: React.ReactNode
}

export default function ContactInfoItem({ icon, title, content }: ContactInfoItemProps) {
	const { settings } = useAnimation()
	const hoverMotion = settings.enabled
		? {
				y: -4,
				scale: 1.02,
				boxShadow: '0 18px 40px rgba(0, 0, 0, 0.35)',
		  }
		: {}

	return (
		<motion.div
			data-anim={settings.enabled}
			className='contact-item flex items-start cursor-pointer'
			whileHover={hoverMotion}>
			<div className='contact-icon flex-shrink-0 p-3 rounded-lg'>
				{icon}
			</div>
			<div className='ml-4'>
				<h4 className='text-lg font-medium text-light'>{title}</h4>
				<p className='text-light-80'>{content}</p>
			</div>
		</motion.div>
	)
}
