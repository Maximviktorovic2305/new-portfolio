import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
	console.log('=== Contact Form API Called ===')

	try {
		// First, try to get the raw text to debug what's being sent
		const rawBody = await request.text()
		console.log('Raw request body:', JSON.stringify(rawBody))

		// Check if the body is empty
		if (!rawBody) {
			console.log('Empty request body')
			return new Response(JSON.stringify({ error: 'Empty request body' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		// Try to parse the JSON
		let body
		try {
			body = JSON.parse(rawBody)
			console.log('Parsed form data:', body)
		} catch (parseError: unknown) {
			console.error('JSON parsing error:', parseError)
			console.log('Raw body that failed to parse:', rawBody)
			return new Response(
				JSON.stringify({
					error: 'Invalid JSON in request body',
					details:
						parseError instanceof Error
							? parseError.message
							: String(parseError),
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } },
			)
		}

		const { name, email, subject, message } = body

		// Validate required fields
		if (!name || !email || !subject || !message) {
			console.log('Validation failed: missing required fields')
			return new Response(
				JSON.stringify({ error: 'All fields are required' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } },
			)
		}

		// Validate environment variables
		if (
			!process.env.SMTP_HOST ||
			!process.env.SMTP_PORT ||
			!process.env.EMAIL_USER ||
			!process.env.EMAIL_PASS
		) {
			console.log('Missing environment variables:', {
				SMTP_HOST: !!process.env.SMTP_HOST,
				SMTP_PORT: !!process.env.SMTP_PORT,
				EMAIL_USER: !!process.env.EMAIL_USER,
				EMAIL_PASS: !!process.env.EMAIL_PASS,
			})
			return new Response(
				JSON.stringify({
					error: 'Server configuration error',
					details:
						'Missing email configuration. Please check environment variables.',
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } },
			)
		}

		// Log environment variables for debugging (without exposing the actual password)
		console.log('SMTP Configuration:', {
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			user: process.env.EMAIL_USER,
			passLength: process.env.EMAIL_PASS?.length,
		})

		// Check for common issues with the password
		const trimmedPass = process.env.EMAIL_PASS.trim()
		if (trimmedPass !== process.env.EMAIL_PASS) {
			console.warn('Warning: EMAIL_PASS has leading/trailing whitespace')
		}

		// Create a transporter object using SMTP transport
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT),
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		// Verify transporter configuration
		console.log('Verifying SMTP connection...')
		await transporter.verify()
		console.log('SMTP connection verified successfully')

		// Send mail with defined transport object
		const info = await transporter.sendMail({
			from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
			to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
			subject: `Portfolio Contact: ${subject}`,
			text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
		})

		console.log('Message sent successfully:', info.messageId)

		return new Response(
			JSON.stringify({ message: 'Message sent successfully!' }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		)
	} catch (error) {
		console.error('Error processing contact form:', error)

		// Provide more specific error messages
		let errorMessage = 'Unknown error'
		if (error instanceof Error) {
			errorMessage = error.message
			// Check for common authentication errors
			if (
				errorMessage.includes('Invalid user or password') ||
				errorMessage.includes('Authentication failed') ||
				errorMessage.includes('535')
			) {
				errorMessage =
					'Authentication failed. Please check your email credentials and ensure you are using an app password, not your regular email password. ' +
					'For Mail.ru, make sure: ' +
					'1. Two-factor authentication is enabled, ' +
					'2. You generated an app password (not your account password), ' +
					'3. The app password is entered correctly without extra spaces. ' +
					'Error details: ' +
					errorMessage
			}
		}

		return new Response(
			JSON.stringify({
				error: 'Failed to process contact form',
				details: errorMessage,
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
	}
}
