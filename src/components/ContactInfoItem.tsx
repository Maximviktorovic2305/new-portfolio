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
	
	// Animation variants for contact icons
	const iconVariants = {
		hover: settings.enabled
			? {
					y: -2,
					scale: 1.05,
					transition: { duration: 0.3 },
			  }
			: {},
	}

	return (
		<motion.div
			className='flex items-start'
			whileHover={iconVariants.hover}>
			<div className='flex-shrink-0 bg-accent/10 p-3 rounded-lg'>
				{icon}
			</div>
			<div className='ml-4'>
				<h4 className='text-lg font-medium text-light'>{title}</h4>
				<p className='text-light-80'>{content}</p>
			</div>
		</motion.div>
	)
}