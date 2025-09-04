'use client'

import { motion } from 'framer-motion'

interface NavItem {
	name: string
	href: string
}

export default function MobileMenuContent({
	navItems,
	isMenuOpen,
	setIsMenuOpen,
}: {
	navItems: NavItem[]
	isMenuOpen: boolean
	setIsMenuOpen: (isOpen: boolean) => void
}) {
	return (
		<>
			{isMenuOpen && (
				<motion.div
					className='md:hidden bg-background/95 backdrop-blur-sm'
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{navItems.map((item) => (
							<motion.a
								key={item.name}
								href={item.href}
								className='block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-accent hover:bg-gray-800'
								onClick={() => setIsMenuOpen(false)}
								whileHover={{ x: 5 }}
								whileTap={{ scale: 0.95 }}>
								{item.name}
							</motion.a>
						))}
					</div>
				</motion.div>
			)}
		</>
	)
}
