'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import DesktopMenu from '@/components/layout/DesktopMenu'
import MobileMenu from '@/components/layout/MobileMenu'
import MobileMenuContent from '@/components/layout/MobileMenuContent'

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const navItems = [
		{ name: 'Главная', href: '#hero' },
		{ name: 'Обо мне', href: '#about' },
		{ name: 'Навыки', href: '#skills' },
		{ name: 'Проекты', href: '#projects' },
		{ name: 'Контакты', href: '#contact' },
	]

	return (
		<motion.nav
			className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-800'
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex items-center'>
						<motion.div
							className='text-xl font-bold text-accent'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Portfolio
						</motion.div>
					</div>

					<DesktopMenu navItems={navItems} />
					<MobileMenu
						navItems={navItems}
						isMenuOpen={isMenuOpen}
						setIsMenuOpen={setIsMenuOpen}
					/>
				</div>
			</div>

			<MobileMenuContent
				navItems={navItems}
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
			/>
		</motion.nav>
	)
}
