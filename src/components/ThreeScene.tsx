'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import ParticleSystem from '@/components/animation/ParticleSystem'

export default function ThreeScene() {
	const [color, setColor] = useState('#6bb2b8')

	useEffect(() => {
		// Listen for theme changes to update particle color
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-theme'
				) {
					const theme = document.documentElement.getAttribute('data-theme')
					setColor(theme === 'dark' ? '#6bb2b8' : '#6bb2b8')
				}
			})
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		})

		return () => observer.disconnect()
	}, [])

	return (
		<div className='absolute inset-0 z-0 overflow-hidden'>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<ParticleSystem color={color} />
			</Canvas>
		</div>
	)
}
