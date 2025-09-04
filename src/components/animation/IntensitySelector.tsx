'use client'

import { useAnimation } from '@/contexts/AnimationContext'
import { motion } from 'framer-motion'

export default function IntensitySelector() {
	const { settings, updateSettings } = useAnimation()

	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			transition={{ duration: 0.3 }}>
			<label className='block text-sm mb-2'>Интенсивность</label>
			<div className='flex space-x-2'>
				{(['subtle', 'moderate', 'intense'] as const).map((intensity) => (
					<button
						key={intensity}
						onClick={() => updateSettings({ intensity })}
						className={`px-3 py-1 text-xs rounded-full transition-colors ${
							settings.intensity === intensity
								? 'bg-accent text-background'
								: 'bg-gray-700 text-foreground hover:bg-gray-600'
						}`}>
						{intensity === 'subtle' && 'Слабая'}
						{intensity === 'moderate' && 'Средняя'}
						{intensity === 'intense' && 'Сильная'}
					</button>
				))}
			</div>
		</motion.div>
	)
}
