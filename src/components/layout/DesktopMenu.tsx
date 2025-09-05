'use client'

import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface NavItem {
	name: string
	href: string
}

export default function DesktopMenu({ navItems }: { navItems: NavItem[] }) {
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

			<ThemeToggle />
		</div>
	)
}
