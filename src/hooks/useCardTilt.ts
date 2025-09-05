import { useState, useRef } from 'react'

interface TiltState {
	rotateX: number
	rotateY: number
}

export const useCardTilt = () => {
	const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
	const cardRef = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return

		const card = cardRef.current
		const rect = card.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		// Calculate rotation based on mouse position relative to center
		const rotateY = ((x - centerX) / centerX) * 10 // Max 10 degrees
		const rotateX = ((centerY - y) / centerY) * 10 // Max 10 degrees

		setTilt({
			rotateX,
			rotateY,
		})
	}

	const handleMouseLeave = () => {
		setTilt({ rotateX: 0, rotateY: 0 })
	}

	return {
		tilt,
		cardRef,
		handleMouseMove,
		handleMouseLeave,
	}
}
