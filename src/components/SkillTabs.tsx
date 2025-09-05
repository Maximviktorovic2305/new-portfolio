'use client'

interface SkillTabsProps {
	activeTab: 'Frontend' | 'Backend'
	onTabChange: (tab: 'Frontend' | 'Backend') => void
}

export default function SkillTabs({ activeTab, onTabChange }: SkillTabsProps) {
	return (
		<div className='flex justify-center mb-12'>
			<div className='inline-flex p-1 bg-gray-800 rounded-lg'>
				<button
					onClick={() => onTabChange('Frontend')}
					className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
						activeTab === 'Frontend'
							? 'bg-accent text-background'
							: 'text-light hover:text-accent'
					}`}>
					Frontend
				</button>
				<button
					onClick={() => onTabChange('Backend')}
					className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
						activeTab === 'Backend'
							? 'bg-accent text-background'
							: 'text-light hover:text-accent'
					}`}>
					Backend
				</button>
			</div>
		</div>
	)
}
