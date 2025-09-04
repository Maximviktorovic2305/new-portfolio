'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'

export default function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggleTheme } = useTheme()

	return (
		<motion.button
			onClick={toggleTheme}
			className={className}
			whileHover={{ rotate: 5 }}
			whileTap={{ scale: 0.9 }}
			aria-label='Toggle theme'>
			{theme === 'dark' ? '🌙' : '☀️'}
		</motion.button>
	)
}
