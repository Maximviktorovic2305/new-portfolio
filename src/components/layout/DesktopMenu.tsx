'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'

interface NavItem {
	name: string
	href: string
}

export default function DesktopMenu({ navItems }: { navItems: NavItem[] }) {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className='hidden md:flex items-center space-x-8'>
			{navItems.map((item) => (
				<motion.a
					key={item.name}
					href={item.href}
					className='text-foreground hover:text-accent transition-colors duration-300'
					whileHover={{ y: -2 }}
					whileTap={{ scale: 0.95 }}>
					{item.name}
				</motion.a>
			))}

			<motion.button
				onClick={toggleTheme}
				className='p-2 rounded-full bg-gray-800 text-foreground hover:text-accent transition-colors duration-300'
				whileHover={{ rotate: 5 }}
				whileTap={{ scale: 0.9 }}
				aria-label='Toggle theme'>
				{theme === 'dark' ? '🌙' : '☀️'}
			</motion.button>
		</div>
	)
}
