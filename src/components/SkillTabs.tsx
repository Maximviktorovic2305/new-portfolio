'use client'

import { motion } from 'framer-motion'

interface SkillTabsProps {
	activeTab: 'Frontend' | 'Backend'
	onTabChange: (tab: 'Frontend' | 'Backend') => void
}

export default function SkillTabs({ activeTab, onTabChange }: SkillTabsProps) {
	return (
		<div className='flex justify-center mb-12'>
			<div className='inline-flex p-1 bg-gray-800 rounded-lg border border-gray-700'>
				<button
					onClick={() => onTabChange('Frontend')}
					className={`relative px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
						activeTab === 'Frontend'
							? 'text-background'
							: 'text-light hover:text-accent'
					}`}>
					{activeTab === 'Frontend' && (
						<motion.span
							layoutId='skills-tab-pill'
							className='absolute inset-0 rounded-md bg-accent shadow-[0_0_20px_rgba(116,221,227,0.35)]'
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						/>
					)}
					<span className='relative z-10'>Frontend</span>
				</button>
				<button
					onClick={() => onTabChange('Backend')}
					className={`relative px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
						activeTab === 'Backend'
							? 'text-background'
							: 'text-light hover:text-accent'
					}`}>
					{activeTab === 'Backend' && (
						<motion.span
							layoutId='skills-tab-pill'
							className='absolute inset-0 rounded-md bg-accent shadow-[0_0_20px_rgba(116,221,227,0.35)]'
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
						/>
					)}
					<span className='relative z-10'>Backend</span>
				</button>
			</div>
		</div>
	)
}
