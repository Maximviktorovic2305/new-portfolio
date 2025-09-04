'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAnimation } from '@/contexts/AnimationContext'

export default function ContactSection() {
	const { settings } = useAnimation()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

	// Animation variants for contact icons
	const iconVariants = {
		hover: settings.enabled
			? {
					y: -2,
					scale: 1.05,
					transition: { duration: 0.3 },
			  }
			: {},
	}

	return (
		<section id='contact' className='py-20 bg-gray-900'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
						Связаться <span className='text-accent'>со мной</span>
					</h2>
					<div className='w-20 h-1 bg-accent mx-auto'></div>
				</motion.div>

				<div className='flex flex-col lg:flex-row gap-12'>
					<motion.div
						className='lg:w-1/2'
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<h3 className='text-2xl font-bold text-foreground mb-6'>
							Давайте обсудим ваш проект
						</h3>
						<p className='text-foreground/80 mb-8'>
							Заинтересованы в сотрудничестве или хотите обсудить идею?
							Заполните форму, и я свяжусь с вами в ближайшее время.
						</p>

						<div className='space-y-6'>
							<motion.div
								className='flex items-start'
								whileHover={iconVariants.hover}>
								<div className='flex-shrink-0 bg-accent/10 p-3 rounded-lg'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
									</svg>
								</div>
								<div className='ml-4'>
									<h4 className='text-lg font-medium text-foreground'>Email</h4>
									<p className='text-foreground/80'>Maximviktorovic@mail.ru</p>
								</div>
							</motion.div>

							<motion.div
								className='flex items-start'
								whileHover={iconVariants.hover}>
								<div className='flex-shrink-0 bg-accent/10 p-3 rounded-lg'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
									</svg>
								</div>
								<div className='ml-4'>
									<h4 className='text-lg font-medium text-foreground'>
										Телефон
									</h4>
									<p className='text-foreground/80'>+7 (999) 123-45-67</p>
								</div>
							</motion.div>

							<motion.div
								className='flex items-start'
								whileHover={iconVariants.hover}>
								<div className='flex-shrink-0 bg-accent/10 p-3 rounded-lg'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
									</svg>
								</div>
								<div className='ml-4'>
									<h4 className='text-lg font-medium text-foreground'>
										Местоположение
									</h4>
									<p className='text-foreground/80'>Москва, Россия</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						className='lg:w-1/2'
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='name' className='block text-foreground mb-2'>
									Имя
								</label>
								<motion.input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleChange}
									required
									className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent'
									whileFocus={settings.enabled ? { scale: 1.02 } : {}}
								/>
							</div>

							<div>
								<label htmlFor='email' className='block text-foreground mb-2'>
									Email
								</label>
								<motion.input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									required
									className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent'
									whileFocus={settings.enabled ? { scale: 1.02 } : {}}
								/>
							</div>

							<div>
								<label htmlFor='subject' className='block text-foreground mb-2'>
									Тема
								</label>
								<motion.input
									type='text'
									id='subject'
									name='subject'
									value={formData.subject}
									onChange={handleChange}
									required
									className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent'
									whileFocus={settings.enabled ? { scale: 1.02 } : {}}
								/>
							</div>

							<div>
								<label htmlFor='message' className='block text-foreground mb-2'>
									Сообщение
								</label>
								<motion.textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									required
									rows={5}
									className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent'
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
					</motion.div>
				</div>
			</div>
		</section>
	)
}
