'use client'

import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

interface Project {
	id: number
	title: string
	description: string
	technologies: string[]
	category: string
}

export default function ProjectsSection() {
	const { settings } = useAnimation()

	const projects: Project[] = [
		{
			id: 1,
			title: 'E-commerce Platform',
			description:
				'Полнофункциональная платформа электронной коммерции с оптимизацией производительности и анимациями.',
			technologies: ['React', 'Node.js', 'MongoDB', 'GSAP'],
			category: 'Fullstack',
		},
		{
			id: 2,
			title: '3D Portfolio Website',
			description:
				'Интерактивное портфолио с 3D элементами и сложными анимациями на Three.js.',
			technologies: ['Next.js', 'Three.js', 'Framer Motion'],
			category: 'Frontend',
		},
		{
			id: 3,
			title: 'Task Management App',
			description:
				'Приложение для управления задачами с реальным временем и уведомлениями.',
			technologies: ['React', 'Express', 'Socket.io', 'MongoDB'],
			category: 'Fullstack',
		},
		{
			id: 4,
			title: 'Animation Library',
			description:
				'Библиотека компонентов с предопределенными анимациями для React приложений.',
			technologies: ['TypeScript', 'Framer Motion', 'GSAP'],
			category: 'Library',
		},
	]

	return (
		<section id='projects' className='py-20 bg-background'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
						Мои <span className='text-accent'>проекты</span>
					</h2>
					<div className='w-20 h-1 bg-accent mx-auto'></div>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							className='bg-gray-800 rounded-xl overflow-hidden'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={
								settings.enabled
									? {
											y: -10,
											boxShadow:
												'0 20px 25px -5px rgba(116, 221, 227, 0.1), 0 10px 10px -5px rgba(116, 221, 227, 0.04)',
									  }
									: {}
							}>
							<div className='p-6'>
								<div className='flex justify-between items-start mb-4'>
									<h3 className='text-xl font-bold text-light'>
										{project.title}
									</h3>
									<span className='text-xs px-2 py-1 bg-accent/20 text-accent rounded-full'>
										{project.category}
									</span>
								</div>

								<p className='text-light-80 mb-6'>{project.description}</p>

								<div className='flex flex-wrap gap-2 mb-6'>
									{project.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className='text-xs px-2 py-1 bg-gray-700 text-light rounded'>
											{tech}
										</span>
									))}
								</div>

								<div className='flex gap-4'>
									<motion.button
										className='px-4 py-2 bg-accent text-background rounded-lg hover:bg-accent/90 transition-colors duration-300'
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}>
										Детали
									</motion.button>
									<motion.button
										className='px-4 py-2 border border-accent text-light rounded-lg hover:bg-accent/10 transition-colors duration-300'
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}>
										GitHub
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
