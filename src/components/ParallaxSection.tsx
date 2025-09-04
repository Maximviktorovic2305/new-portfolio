'use client'

import { useEffect, useRef } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

export default function ParallaxSection() {
	const parallaxRef = useRef<HTMLDivElement>(null)
	const { settings } = useAnimation()

	useEffect(() => {
		if (!settings.enabled) {
			if (parallaxRef.current) {
				parallaxRef.current.style.transform = 'translateY(0px)'
			}
			return
		}

		const handleScroll = () => {
			if (parallaxRef.current) {
				const scrollPosition = window.scrollY
				const speed =
					settings.intensity === 'subtle'
						? 0.2
						: settings.intensity === 'moderate'
						? 0.5
						: 0.8

				parallaxRef.current.style.transform = `translateY(${
					scrollPosition * speed
				}px)`
			}
		}

		// Use requestAnimationFrame for better performance
		let ticking = false

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [settings])

	return (
		<div className='relative h-[500px] overflow-hidden'>
			<div
				ref={parallaxRef}
				className='absolute inset-0 flex items-center justify-center'
				style={{
					backgroundImage:
						'radial-gradient(circle at center, #74dde3 1px, transparent 1px), linear-gradient(45deg, #0a0a0a 25%, #1a1a1a 25%, #1a1a1a 50%, #0a0a0a 50%, #0a0a0a 75%, #1a1a1a 75%)',
					backgroundSize: '20px 20px, 40px 40px',
				}}>
				<div className='text-center p-8 bg-background/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl max-w-2xl mx-4'>
					<h2 className='text-4xl font-bold text-foreground mb-6'>
						Эффект <span className='text-accent'>параллакса</span>
					</h2>
					<p className='text-foreground/90 text-lg mb-4'>
						Этот раздел демонстрирует эффект параллакса при прокрутке.
					</p>
					<p className='text-foreground/80'>
						Элементы движутся с разной скоростью, создавая ощущение глубины.
						Продолжайте прокручивать, чтобы увидеть эффект в действии.
					</p>
				</div>
			</div>
		</div>
	)
}
