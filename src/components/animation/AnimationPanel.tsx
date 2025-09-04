'use client'

import { useAnimation } from '@/contexts/AnimationContext'
import AnimationToggle from './AnimationToggle'
import IntensitySelector from './IntensitySelector'

export default function AnimationPanel() {
	const { settings } = useAnimation()

	return (
		<div className='fixed bottom-4 right-4 z-50 bg-gray-800/90 backdrop-blur-sm p-4 text-white/80 rounded-lg border border-gray-700'>
			<h3 className='font-medium mb-3'>Настройки анимации</h3>

			<div className='space-y-3'>
				<AnimationToggle />

				{settings.enabled && <IntensitySelector />}
			</div>
		</div>
	)
}
