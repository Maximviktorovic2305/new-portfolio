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
	const { tilt, cardRef, handleMouseMove, handleMouseLeave } = useCardTilt()

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
			<div
				ref={cardRef}
				className='bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col'
				onMouseMove={settings.enabled ? handleMouseMove : undefined}
				onMouseLeave={settings.enabled ? handleMouseLeave : undefined}
				style={{
					transform: settings.enabled
						? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1, 1, 1)`
						: 'none',
					transition: settings.enabled ? 'transform 0.1s ease-out' : 'none',
					transformStyle: 'preserve-3d',
				}}>
				<div className='p-6 flex flex-col h-full'>
					<div className='flex justify-between items-start mb-4'>
						<h3 className='text-xl font-bold text-light'>{project.title}</h3>
						<span className='text-xs px-2 py-1 bg-accent/20 text-accent rounded-full'>
							{project.category}
						</span>
					</div>

					<p className='text-light-80 mb-6 flex-grow'>{project.description}</p>

					<div className='flex flex-wrap gap-2 mb-6'>
						{project.technologies.map((tech, techIndex) => (
							<span
								key={techIndex}
								className='text-xs px-2 py-1 bg-gray-700 text-light rounded'>
								{tech}
							</span>
						))}
					</div>

					<div className='flex gap-4 mt-auto'>
						<Link href={project.site} target='_blank'>
							<motion.button
								className='px-4 py-2 bg-accent text-background rounded-lg cursor-pointer hover:bg-accent/90 transition-colors duration-300'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								На сайт
							</motion.button>
						</Link>
						<Link href={project.github || '#'} target='_blank'>
							<motion.button
								className={`px-4 py-2 border border-accent text-light rounded-lg cursor-pointer transition-colors duration-300 ${
									project.github
										? 'hover:bg-accent/10'
										: 'opacity-50 cursor-not-allowed'
								}`}
								whileHover={project.github ? { scale: 1.05 } : {}}
								whileTap={project.github ? { scale: 0.95 } : {}}
								onClick={handleGithubClick}>
								GitHub
							</motion.button>
						</Link>
					</div>
				</div>
			</div>

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
