'use client'

import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

interface SocialIconProps {
	name: string
	url: string
	icon: React.ReactNode
	className?: string
}

export default function SocialIcon({
	name,
	url,
	icon,
	className = 'text-light-80 hover:text-[#74dde3] transition-colors duration-300',
}: SocialIconProps) {
	const { settings } = useAnimation()

	// Animation variants for social icons
	const iconVariants = {
		hover: settings.enabled
			? {
					y: -5,
					scale: 1.1,
					transition: { duration: 0.3 },
			  }
			: {},
	}

	return (
		<motion.a
			key={name}
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className={className}
			whileHover={iconVariants.hover}
			whileTap={{ scale: 0.9 }}>
			{icon}
		</motion.a>
	)
}
