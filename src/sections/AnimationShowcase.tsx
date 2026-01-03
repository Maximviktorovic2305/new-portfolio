'use client'

import { useState, useEffect } from 'react'
import ThreeScene from '@/components/ThreeScene'
import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

export default function AnimationShowcase() {
	const [isVisible, setIsVisible] = useState(false)
	const { settings } = useAnimation()

	useEffect(() => {
		setIsVisible(true)
		return () => setIsVisible(false)
	}, [])

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-background'>
			{/* Particle Background */}
			<div className='absolute inset-0 z-0'>
				<ThreeScene />
			</div>

			{/* Content */}
			<div className='relative z-10 container mx-auto px-4 py-20 text-white'>
				<div className='max-w-4xl mx-auto text-center'>
					<motion.h2
						className='text-4xl md:text-5xl font-bold  mb-6'
						initial={{ opacity: 0, y: 20 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}>
						Современный <span className='text-accent'>стэк технологий</span>
					</motion.h2>

					<motion.p
						className='text-xl mb-8 max-w-3xl mx-auto'
						initial={{ opacity: 0, y: 20 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.4 }}>
						Использую передовые технологии для создания интерактивных и
						визуально впечатляющих веб-приложений
					</motion.p>

					<motion.div
						className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'
						initial={{ opacity: 0, y: 30 }}
						animate={isVisible ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.6 }}>
						<motion.div
							data-anim={settings.enabled}
							className='card-surface card-surface--soft p-6 rounded-xl'
							whileHover={
								settings.enabled ? { y: -8, rotateX: 3, rotateY: -3 } : {}
							}
							transition={{ type: 'spring', stiffness: 220, damping: 18 }}
							style={{ transformStyle: 'preserve-3d' }}>
							<div className='card-grid' aria-hidden='true' />
							<div className='card-shine' aria-hidden='true' />
							<div className='card-content'>
								<h3 className='text-xl font-semibold mb-3'>Современный UI/UX</h3>
								<p>
									Создание объемных и интерактивных элементов для веб-приложений
								</p>
							</div>
						</motion.div>

						<motion.div
							data-anim={settings.enabled}
							className='card-surface card-surface--soft p-6 rounded-xl'
							whileHover={
								settings.enabled ? { y: -8, rotateX: 3, rotateY: -3 } : {}
							}
							transition={{ type: 'spring', stiffness: 220, damping: 18 }}
							style={{ transformStyle: 'preserve-3d' }}>
							<div className='card-grid' aria-hidden='true' />
							<div className='card-shine' aria-hidden='true' />
							<div className='card-content'>
								<h3 className='text-xl font-semibold mb-3'>
									Высокая производительность
								</h3>
								<p>
									Оптимизация и производительные решения для современных
									приложений
								</p>
							</div>
						</motion.div>

						<motion.div
							data-anim={settings.enabled}
							className='card-surface card-surface--soft p-6 rounded-xl'
							whileHover={
								settings.enabled ? { y: -8, rotateX: 3, rotateY: -3 } : {}
							}
							transition={{ type: 'spring', stiffness: 220, damping: 18 }}
							style={{ transformStyle: 'preserve-3d' }}>
							<div className='card-grid' aria-hidden='true' />
							<div className='card-shine' aria-hidden='true' />
							<div className='card-content'>
								<h3 className='text-xl font-semibold mb-3'>
									Современные фреймворки
								</h3>
								<p>
									Разработка с использованием актуальных технологий и библиотек
								</p>
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						className='mt-12'
						initial={{ opacity: 0 }}
						animate={isVisible ? { opacity: 1 } : {}}
						transition={{ duration: 1, delay: 1 }}>
						<div className='inline-block bg-accent/10 px-6 py-3 rounded-full border border-accent/30'>
							<p className='text-accent font-medium'>
								Прокрутите вниз, чтобы узнать больше
							</p>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Gradient overlay for better text readability */}
			<div className='absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 z-5'></div>
		</section>
	)
}
