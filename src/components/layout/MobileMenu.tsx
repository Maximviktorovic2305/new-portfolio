'use client'

import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface NavItem {
	name: string
	href: string
}

export default function MobileMenu({
	isMenuOpen,
	setIsMenuOpen,
}: {
	navItems: NavItem[]
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
}) {
	return (
		<div className='md:hidden flex items-center'>
			<ThemeToggle className='p-2 mr-2' />

			<motion.button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className='p-2 rounded-md text-foreground hover:text-accent focus:outline-none'
				whileTap={{ scale: 0.9 }}>
				{isMenuOpen ? '✕' : '☰'}
			</motion.button>
		</div>
	)
}
