'use client'

import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { useState } from 'react'

interface FormData {
	name: string
	email: string
	subject: string
	message: string
}

interface ContactFormProps {
	initialData?: FormData
}

export default function ContactForm({ initialData }: ContactFormProps) {
	const { settings } = useAnimation()
	const [formData, setFormData] = useState<FormData>(
		initialData || {
			name: '',
			email: '',
			subject: '',
			message: '',
		}
	)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Form submission logic would go here
		console.log('Form submitted:', formData)
		alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.')
		setFormData({ name: '', email: '', subject: '', message: '' })
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div>
				<label htmlFor='name' className='block text-light mb-2'>
					Имя
				</label>
				<motion.input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-accent'
					whileFocus={settings.enabled ? { scale: 1.02 } : {}}
				/>
			</div>

			<div>
				<label htmlFor='email' className='block text-light mb-2'>
					Email
				</label>
				<motion.input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-accent'
					whileFocus={settings.enabled ? { scale: 1.02 } : {}}
				/>
			</div>

			<div>
				<label htmlFor='subject' className='block text-light mb-2'>
					Тема
				</label>
				<motion.input
					type='text'
					id='subject'
					name='subject'
					value={formData.subject}
					onChange={handleChange}
					required
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-accent'
					whileFocus={settings.enabled ? { scale: 1.02 } : {}}
				/>
			</div>

			<div>
				<label htmlFor='message' className='block text-light mb-2'>
					Сообщение
				</label>
				<motion.textarea
					id='message'
					name='message'
					value={formData.message}
					onChange={handleChange}
					required
					rows={5}
					className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-light focus:outline-none focus:ring-2 focus:ring-accent'
					whileFocus={settings.enabled ? { scale: 1.02 } : {}}
				/>
			</div>

			<motion.button
				type='submit'
				className='w-full px-6 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent/90 transition-colors duration-300'
				whileHover={
					settings.enabled
						? {
								scale: 1.02,
								boxShadow: '0 0 20px rgba(116, 221, 227, 0.5)',
						  }
						: {}
				}
				whileTap={{ scale: 0.98 }}>
				Отправить сообщение
			</motion.button>
		</form>
	)
}