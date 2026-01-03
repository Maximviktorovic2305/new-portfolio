'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCardTilt } from '@/hooks'
import { useAnimation } from '@/contexts/AnimationContext'
import { Project } from '@/types'
import Link from 'next/link'

interface ProjectCardProps {
	project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const [showPopup, setShowPopup] = useState(false)
	const { settings } = useAnimation()
	const maxTilt =
		settings.intensity === 'subtle'
			? 6
			: settings.intensity === 'moderate'
			? 10
			: 14
	const { tilt, cardRef, handleMouseMove, handleMouseLeave } = useCardTilt({
		maxTilt,
	})
	const hoverMotion = settings.enabled
		? { y: -8, scale: 1.02, rotateZ: 0.2 }
		: {}

	const handleGithubClick = (e: React.MouseEvent) => {
		if (!project.github) {
			e.preventDefault()
			setShowPopup(true)
			// Auto-hide popup after 3 seconds
			setTimeout(() => setShowPopup(false), 3000)
		}
	}

	return (
		<div className='relative h-full flex flex-col'>
			<motion.div
				className='relative h-full'
				whileHover={hoverMotion}
				transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
				<div
					ref={cardRef}
					data-anim={settings.enabled}
					className='card-surface rounded-2xl overflow-hidden h-full flex flex-col'
					onMouseMove={settings.enabled ? handleMouseMove : undefined}
					onMouseLeave={settings.enabled ? handleMouseLeave : undefined}
					style={{
						transform: settings.enabled
							? `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
							: 'none',
						transition: settings.enabled ? 'transform 0.12s ease-out' : 'none',
						transformStyle: 'preserve-3d',
					}}>
					<div className='card-grid' aria-hidden='true' />
					<div className='card-shine' aria-hidden='true' />
					<div className='card-content p-6 flex flex-col h-full'>
						<div className='flex justify-between items-start mb-4'>
							<h3 className='text-xl font-bold text-accent'>{project.title}</h3>
							<span className='badge-glow text-xs px-2 py-1 text-accent rounded-full'>
								{project.category}
							</span>
						</div>

						<p className='text-light-80 mb-6 grow'>{project.description}</p>

						<div className='flex flex-wrap gap-2 mb-6'>
							{project.technologies.map((tech, techIndex) => (
								<span key={techIndex} className='chip text-xs px-2 py-1 text-light rounded'>
									{tech}
								</span>
							))}
						</div>

						<div className='flex gap-4 mt-auto'>
							<Link href={project.site} target='_blank'>
								<motion.button
									data-anim={settings.enabled}
									className='button-glow px-4 py-2 bg-accent text-background rounded-lg cursor-pointer transition-colors duration-300'
									whileHover={settings.enabled ? { scale: 1.05, y: -2 } : {}}
									whileTap={{ scale: 0.95 }}>
									<span>На сайт</span>
								</motion.button>
							</Link>
							<Link href={project.github || '#'} target='_blank'>
								<motion.button
									data-anim={settings.enabled}
									className={`button-ghost px-4 py-2 border border-accent text-light rounded-lg cursor-pointer transition-colors duration-300 ${
										project.github
											? 'hover:bg-accent/10'
											: 'opacity-50 cursor-not-allowed'
									}`}
									whileHover={project.github && settings.enabled ? { scale: 1.05, y: -2 } : {}}
									whileTap={project.github ? { scale: 0.95 } : {}}
									onClick={handleGithubClick}>
									<span>GitHub</span>
								</motion.button>
							</Link>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Popup for commercial projects */}
			{showPopup && (
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800 border border-gray-700 rounded-lg p-4 w-64 shadow-xl'>
					<p className='text-light text-center'>
						Так как проект является коммерческим, доступ к коду закрыт. Спасибо
						за понимание.
					</p>
				</div>
			)}
		</div>
	)
}
