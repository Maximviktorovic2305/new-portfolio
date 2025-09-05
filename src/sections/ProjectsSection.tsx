'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data'
import ProjectCard from '@/components/ProjectCard'
import GitHubLink from '@/components/GitHubLink'

export default function ProjectsSection() {
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
							className='h-full'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</div>

				<motion.div
					className='mt-16 text-center'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<p className='text-foreground/80 mb-6'>
						Здесь представлены лишь некоторые из моих проектов
					</p>
					<GitHubLink
						url='https://github.com/Maximviktorovic2305'
						text='Посмотреть все 40+ проектов на GitHub'
					/>
				</motion.div>
			</div>
		</section>
	)
}
