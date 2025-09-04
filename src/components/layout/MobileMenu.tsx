'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'

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
	const { theme, toggleTheme } = useTheme()

	return (
		<div className='md:hidden flex items-center'>
			<motion.button
				onClick={toggleTheme}
				className='p-2 mr-2 rounded-full bg-gray-800 text-foreground hover:text-accent transition-colors duration-300'
				whileTap={{ scale: 0.9 }}
				aria-label='Toggle theme'>
				{theme === 'dark' ? '🌙' : '☀️'}
			</motion.button>

			<motion.button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className='p-2 rounded-md text-foreground hover:text-accent focus:outline-none'
				whileTap={{ scale: 0.9 }}>
				{isMenuOpen ? '✕' : '☰'}
			</motion.button>
		</div>
	)
}
