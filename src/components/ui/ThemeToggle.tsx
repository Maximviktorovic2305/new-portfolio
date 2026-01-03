'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggleTheme } = useTheme()

	return (
		<motion.button
			onClick={toggleTheme}
			className={`theme-toggle ${className ?? ''}`}
			aria-label='Toggle theme'
			aria-pressed={theme === 'dark'}
			whileTap={{ scale: 0.95 }}>
			<span className='theme-toggle__halo' aria-hidden='true' />
			<motion.span
				className='theme-toggle__orb'
				animate={{ rotate: theme === 'dark' ? 0 : 180 }}
				transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
				<AnimatePresence mode='wait' initial={false}>
					{theme === 'dark' ? (
						<motion.svg
							key='moon'
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4 md:h-5 md:w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
							animate={{ opacity: 1, rotate: 0, scale: 1 }}
							exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
							transition={{ duration: 0.2 }}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
							/>
						</motion.svg>
					) : (
						<motion.svg
							key='sun'
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-4 md:h-5 md:w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
							animate={{ opacity: 1, rotate: 0, scale: 1 }}
							exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
							transition={{ duration: 0.2 }}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
							/>
						</motion.svg>
					)}
				</AnimatePresence>
			</motion.span>
		</motion.button>
	)
}
