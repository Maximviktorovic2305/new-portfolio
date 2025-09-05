export interface Project {
	id: number
	title: string
	description: string
	technologies: string[]
	category: string
	site: string
	github: string
}

export interface Skill {
	name: string
	description: string
	category: 'Frontend' | 'Backend'
	url: string
}
