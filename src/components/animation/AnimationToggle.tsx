'use client'

import { useAnimation } from '@/contexts/AnimationContext'

export default function AnimationToggle() {
	const { settings, updateSettings } = useAnimation()

	return (
		<div>
			<label className='flex items-center text-sm'>
				<input
					type='checkbox'
					checked={settings.enabled}
					onChange={(e) => updateSettings({ enabled: e.target.checked })}
					className='mr-2 w-4 h-4 accent-accent'
				/>
				Включить анимации
			</label>
		</div>
	)
}
