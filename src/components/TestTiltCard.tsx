'use client'

import { useCardTilt } from '@/hooks'

export default function TestTiltCard() {
	const { tilt, cardRef, handleMouseMove, handleMouseLeave } = useCardTilt()

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='w-64 h-40 bg-blue-500 rounded-lg flex items-center justify-center m-10'
			style={{
				transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
				transition: 'transform 0.1s ease-out',
				transformStyle: 'preserve-3d',
			}}>
			<p className='text-white font-bold'>Tilt Card Test</p>
		</div>
	)
}
