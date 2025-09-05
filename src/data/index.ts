import { Project } from '@/types'

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
		description: 'Мой дествующиий сайт, с нейросетью Mistral AI без VPN на русском языке',
		technologies: ['Next.js', 'Nest.js', 'CI/CD'],
		category: 'Fullstack',
		site: 'https://aicontact.tech',
		github: 'https://github.com/Maximviktorovic2305/chat-gpt-app',
	},
	{
		id: 3,
		title: 'Macrosmatic',
		description:
			'Современная финтех платформа для инвестиций',
		technologies: ['Nuxt', 'Tanstack', 'Pinia'],
		category: 'Frontend',
		site: 'https://macrosmatic.pro',
		github: '',
	},
	{
		id: 4,
		title: 'Telegram Game Axiora Clicker',
		description:
			'Телеграм мини апп игра Axiora Clicker',
		technologies: ['TypeScript', 'Framer Motion', 'GSAP'],
		category: 'Frontend',
		site: 'https://t.me/david_lee_bot',
		github: '',
	},
]
