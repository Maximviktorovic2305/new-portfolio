import { useState, useRef } from 'react'

interface TiltState {
	rotateX: number
	rotateY: number
}

interface TiltOptions {
	maxTilt?: number
}

export const useCardTilt = (options: TiltOptions = {}) => {
	const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
	const cardRef = useRef<HTMLDivElement>(null)
	const maxTilt = options.maxTilt ?? 10

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return

		const card = cardRef.current
		const rect = card.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		// Calculate rotation based on mouse position relative to center
		const rotateY = ((x - centerX) / centerX) * maxTilt
		const rotateX = ((centerY - y) / centerY) * maxTilt

		setTilt({
			rotateX,
			rotateY,
		})

		const percentX = (x / rect.width) * 100
		const percentY = (y / rect.height) * 100
		card.style.setProperty('--mx', `${percentX}%`)
		card.style.setProperty('--my', `${percentY}%`)
	}

	const handleMouseLeave = () => {
		setTilt({ rotateX: 0, rotateY: 0 })
		if (cardRef.current) {
			cardRef.current.style.setProperty('--mx', '50%')
			cardRef.current.style.setProperty('--my', '50%')
		}
	}

	return {
		tilt,
		cardRef,
		handleMouseMove,
		handleMouseLeave,
	}
}
