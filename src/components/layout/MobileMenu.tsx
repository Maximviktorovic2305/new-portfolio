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
				className='menu-toggle p-2 rounded-md text-foreground hover:text-accent focus:outline-none cursor-pointer'
				whileHover={{ scale: 1.08, rotate: -2 }}
				whileTap={{ scale: 0.9 }}>
				<span className='sr-only'>Toggle menu</span>
				<span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
					<span className='menu-line' />
					<span className='menu-line' />
					<span className='menu-line' />
				</span>
			</motion.button>
		</div>
	)
}
