'use client'

import { motion } from 'framer-motion'
import ThreeScene from '@/components/ThreeScene'
import { useAnimation } from '@/contexts/AnimationContext'

export default function HeroSection() {
	const { settings } = useAnimation()

	return (
		<section
			id='hero'
			className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Three.js Background */}
			<ThreeScene />

			{/* Content */}
			<div className='relative z-10 text-center px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					<motion.h1
						className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						Привет, я <span className='text-accent'>Максим</span>
					</motion.h1>

					<motion.p
						className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}>
						Fullstack разработчик, создающий современные веб-приложения
					</motion.p>

					<motion.div
						className='flex flex-col sm:flex-row justify-center gap-4'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}>
						<motion.a
							href='#projects'
							className='px-8 py-3 bg-accent text-background font-medium rounded-full hover:bg-accent/90 transition-colors duration-300'
							whileHover={{
								scale: 1.05,
								boxShadow: settings.enabled
									? '0 0 20px rgba(116, 221, 227, 0.5)'
									: 'none',
							}}
							whileTap={{ scale: 0.95 }}>
							Мои работы
						</motion.a>

						<motion.a
							href='#contact'
							className='px-8 py-3 bg-transparent border-2 border-accent font-medium rounded-full hover:bg-accent/10 transition-colors duration-300'
							whileHover={{
								scale: 1.05,
								boxShadow: settings.enabled
									? '0 0 20px rgba(116, 221, 227, 0.3)'
									: 'none',
							}}
							whileTap={{ scale: 0.95 }}>
							Связаться
						</motion.a>
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
				animate={{ y: [0, 10, 0] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
				}}>
				<motion.div
					className='w-8 h-12 rounded-full border-2 border-accent flex justify-center'
					whileHover={{ scale: 1.1 }}>
					<motion.div
						className='w-2 h-2 bg-accent rounded-full mt-2'
						animate={{ y: [0, 12, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</motion.div>
			</motion.div>
		</section>
	)
}
