'use client'

import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { useState, useRef, useEffect } from 'react'

interface Skill {
	name: string
	description: string
	category: 'Frontend' | 'Backend'
	url: string
}

export default function SkillsSection() {
	const { settings } = useAnimation()
	const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend'>('Frontend')
	const [popup, setPopup] = useState<{
		skill: Skill
		x: number
		y: number
	} | null>(null)
	const popupRef = useRef<HTMLDivElement>(null)
	const sectionRef = useRef<HTMLElement>(null)

	// Close popup when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node)
			) {
				setPopup(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const skills: Skill[] = [
		// Frontend skills
		{
			name: 'HTML&CSS',
			description:
				'Создание семантической и адаптивной верстки с использованием современных подходов',
			category: 'Frontend',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
		},
		{
			name: 'React.js',
			description:
				'Разработка интерактивных пользовательских интерфейсов с использованием хуков и контекста',
			category: 'Frontend',
			url: 'https://reactjs.org/',
		},
		{
			name: 'Next.js',
			description:
				'Создание производительных веб-приложений с SSR, SSG и оптимизациями',
			category: 'Frontend',
			url: 'https://nextjs.org/',
		},
		{
			name: 'Nuxt',
			description:
				'Универсальный фреймворк для Vue.js приложений с серверным рендерингом',
			category: 'Frontend',
			url: 'https://nuxtjs.org/',
		},
		{
			name: 'React Native',
			description:
				'Разработка кроссплатформенных мобильных приложений с нативной производительностью',
			category: 'Frontend',
			url: 'https://reactnative.dev/',
		},
		{
			name: 'Redux',
			description:
				'Управление состоянием приложения с помощью предсказуемого контейнера состояния',
			category: 'Frontend',
			url: 'https://redux.js.org/',
		},
		{
			name: 'Zustand',
			description:
				'Маленький, быстрый и масштабируемый менеджер состояний для React',
			category: 'Frontend',
			url: 'https://zustand-demo.pmnd.rs/',
		},
		{
			name: 'TypeScript',
			description:
				'Статическая типизация для JavaScript с улучшенной автозаполнением и предотвращением ошибок',
			category: 'Frontend',
			url: 'https://www.typescriptlang.org/',
		},
		{
			name: 'Tailwind',
			description:
				'Утилитарный CSS-фреймворк для быстрой и согласованной разработки интерфейсов',
			category: 'Frontend',
			url: 'https://tailwindcss.com/',
		},
		{
			name: 'React-query',
			description:
				'Управление серверным состоянием, кэширование и синхронизация данных',
			category: 'Frontend',
			url: 'https://react-query.tanstack.com/',
		},
		{
			name: 'Socket.io',
			description:
				'Реализация реального времени и двунаправленной связи между клиентом и сервером',
			category: 'Frontend',
			url: 'https://socket.io/',
		},
		{
			name: 'Vue.js',
			description:
				'Прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов',
			category: 'Frontend',
			url: 'https://vuejs.org/',
		},

		// Backend skills
		{
			name: 'Node.js',
			description:
				'Создание масштабируемых серверных приложений на JavaScript/TypeScript',
			category: 'Backend',
			url: 'https://nodejs.org/',
		},
		{
			name: 'Express.js',
			description:
				'Минималистичный веб-фреймворк для Node.js с гибкой маршрутизацией',
			category: 'Backend',
			url: 'https://expressjs.com/',
		},
		{
			name: 'Nest.js',
			description:
				'Прогрессивный фреймворк Node.js с архитектурой Angular и TypeScript',
			category: 'Backend',
			url: 'https://nestjs.com/',
		},
		{
			name: 'REST API',
			description:
				'Разработка RESTful сервисов с правильной архитектурой и документацией',
			category: 'Backend',
			url: 'https://restfulapi.net/',
		},
		{
			name: 'GraphQL',
			description:
				'Запросы и манипуляции данными с помощью типизированного runtime для API',
			category: 'Backend',
			url: 'https://graphql.org/',
		},
		{
			name: 'Prisma',
			description:
				'ORM следующего поколения с типобезопасными запросами к базе данных',
			category: 'Backend',
			url: 'https://www.prisma.io/',
		},
		{
			name: 'Sequelize',
			description: 'ORM для Node.js с поддержкой различных СУБД и миграций',
			category: 'Backend',
			url: 'https://sequelize.org/',
		},
		{
			name: 'PostgreSQL',
			description:
				'Мощная объектно-реляционная система управления базами данных',
			category: 'Backend',
			url: 'https://www.postgresql.org/',
		},
		{
			name: 'MongoDB',
			description:
				'Документоориентированная NoSQL база данных для гибкого хранения данных',
			category: 'Backend',
			url: 'https://www.mongodb.com/',
		},
		{
			name: 'Swagger',
			description:
				'Инструмент для проектирования, сборки, документирования и использования RESTful веб-сервисов',
			category: 'Backend',
			url: 'https://swagger.io/',
		},
		{
			name: 'Docker',
			description:
				'Контейнеризация приложений для обеспечения согласованности окружения и развертывания',
			category: 'Backend',
			url: 'https://www.docker.com/',
		},
		{
			name: 'Golang',
			description:
				'Компилируемый многопоточный язык программирования с высокой производительностью',
			category: 'Backend',
			url: 'https://golang.org/',
		},
	]

	const filteredSkills = skills.filter((skill) => skill.category === activeTab)

	const handleSkillHover = (skill: Skill, event: React.MouseEvent) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setPopup({
			skill,
			x: rect.left + rect.width / 2,
			y: rect.top - 10,
		})
	}

	const handleSkillClick = (skill: Skill, event: React.MouseEvent) => {
		event.stopPropagation()
		window.open(skill.url, '_blank')
	}

	const handleSectionLeave = () => {
		// Close all popups when leaving the section
		setPopup(null)
	}

	return (
		<section
			id='skills'
			className='py-20 bg-gray-900 relative'
			ref={sectionRef}
			onMouseLeave={handleSectionLeave}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-light mb-4'>
						Мои <span className='text-accent'>навыки</span>
					</h2>
					<div className='w-20 h-1 bg-accent mx-auto'></div>
				</motion.div>

				{/* Tab Navigation */}
				<div className='flex justify-center mb-12'>
					<div className='inline-flex p-1 bg-gray-800 rounded-lg'>
						<button
							onClick={() => setActiveTab('Frontend')}
							className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
								activeTab === 'Frontend'
									? 'bg-accent text-background'
									: 'text-light hover:text-accent'
							}`}>
							Frontend
						</button>
						<button
							onClick={() => setActiveTab('Backend')}
							className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
								activeTab === 'Backend'
									? 'bg-accent text-background'
									: 'text-light hover:text-accent'
							}`}>
							Backend
						</button>
					</div>
				</div>

				{/* Skills Grid */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
					{filteredSkills.map((skill, index) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							className='relative'
							onMouseEnter={(e) => handleSkillHover(skill, e)}
							onClick={(e) => handleSkillClick(skill, e)}>
							<div className='bg-gray-800 hover:bg-gray-750 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 border border-gray-700 hover:border-accent'>
								<span className='text-light text-sm font-medium'>
									{skill.name}
								</span>
							</div>
						</motion.div>
					))}
				</div>

				{/* Popup */}
				{popup && (
					<div
						ref={popupRef}
						className='fixed z-50 bg-gray-800 border border-gray-700 rounded-lg p-4 w-64 shadow-xl'
						style={{
							left: `${popup.x}px`,
							top: `${popup.y}px`,
							transform: 'translate(-50%, -100%)',
						}}>
						<h3 className='text-lg font-bold text-light mb-2'>
							{popup.skill.name}
						</h3>
						<p className='text-light-80 text-sm mb-3'>
							{popup.skill.description}
						</p>
						<a
							href={popup.skill.url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-accent text-sm font-medium hover:underline inline-flex items-center'
							onClick={(e) => e.stopPropagation()}>
							Перейти к документации
							<svg
								className='w-4 h-4 ml-1'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
								/>
							</svg>
						</a>
					</div>
				)}
			</div>
		</section>
	)
}
