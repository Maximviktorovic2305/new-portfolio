import { Project, Skill } from '@/types'

export const projects: Project[] = [
	{
		id: 1,
		title: 'MaxMusic',
		description:
			'Мой дествующиий сайт, где каждый может выложить свой уникальный трек, слушать треки других, обсуждать композиции и тд. На сайте указана моя музыка',
		technologies: [
			'Next.js',
			'Tanstack',
			'Redux',
			'Nest.js',
			'Postgres',
			'CI/CD',
		],
		category: 'Fullstack',
		site: 'https://maxmusic.pro',
		github: 'https://github.com/Maximviktorovic2305/my-songs-site',
	},
	{
		id: 2,
		title: 'Ai Chat',
		description:
			'Мой дествующиий сайт, с нейросетью Mistral AI без VPN на русском языке',
		technologies: ['Next.js', 'Nest.js', 'CI/CD'],
		category: 'Fullstack',
		site: 'https://aicontact.tech',
		github: 'https://github.com/Maximviktorovic2305/chat-gpt-app',
	},
	{
		id: 3,
		title: 'Macrosmatic',
		description: 'Современная финтех платформа для инвестиций',
		technologies: ['Nuxt', 'Tanstack', 'Pinia'],
		category: 'Frontend',
		site: 'https://macrosmatic.pro',
		github: '',
	},
	{
		id: 4,
		title: 'Telegram Game Axiora Clicker',
		description: 'Телеграм мини апп игра Axiora Clicker',
		technologies: ['TypeScript', 'Framer Motion', 'GSAP'],
		category: 'Frontend',
		site: 'https://t.me/david_lee_bot',
		github: '',
	},
]

export const skills: Skill[] = [
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
		description: 'Мощная объектно-реляционная система управления базами данных',
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

export const socialLinks = [
	{
		name: 'GitHub',
		url: 'https://github.com/Maximviktorovic2305',
		icon: (
			<svg
				className='w-6 h-6 text-inherit'
				fill='currentColor'
				viewBox='0 0 24 24'>
				<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z' />
			</svg>
		),
	},
	{
		name: 'Telegram',
		url: 'https://t.me/Maximviktorovic2305',
		icon: (
			<svg
				className='w-6 h-6 text-inherit'
				fill='currentColor'
				viewBox='0 0 24 24'>
				<path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z' />
			</svg>
		),
	},
	{
		name: 'Email',
		url: 'mailto:Maximviktorovic@mail.ru',
		icon: (
			<svg
				className='w-6 h-6 text-inherit'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
			</svg>
		),
	},
]
