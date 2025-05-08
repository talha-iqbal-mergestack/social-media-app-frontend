import { useState } from 'react'
import {
	Box,
	Button,
	Input,
	VStack,
	Text,
	Link,
	Field,
	Card,
} from '@chakra-ui/react'

import { Toaster, toaster } from '@/components/ui/toaster'
import { OTPVerification } from './OTPVerification'

export const SignInForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showForgotPassword, setShowForgotPassword] = useState(false)
	const [showOTPVerification, setShowOTPVerification] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// TODO: Implement API call to sign in user
			const response = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error('Invalid credentials')
			}

			toaster.create({
				title: 'Success',
				description: 'Signed in successfully!',
				type: 'success',
			})

			// TODO: Handle successful login (e.g., redirect to dashboard)
		} catch (error) {
			toaster.create({
				title: 'Error',
				description: error instanceof Error ? error.message : 'Sign in failed',
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// TODO: Implement API call to request password reset
			const response = await fetch('/api/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: formData.email }),
			})

			if (!response.ok) {
				throw new Error('Failed to send reset code')
			}

			toaster.create({
				title: 'Success',
				description: 'Password reset code sent to your email',
				type: 'success',
			})

			setShowOTPVerification(true)
		} catch (error) {
			toaster.create({
				title: 'Error',
				description: error instanceof Error ? error.message : 'Request failed',
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleVerificationComplete = () => {
		// TODO: Redirect to password reset page
		console.log('OTP verification completed')
	}

	if (showOTPVerification) {
		return (
			<OTPVerification
				type="reset-password"
				email={formData.email}
				onVerificationComplete={handleVerificationComplete}
			/>
		)
	}

	if (showForgotPassword) {
		return (
			<Card.Root>
				<Card.Body>
					<Box as="form" onSubmit={handleForgotPassword} width="100%">
						<VStack gap={4}>
							<Text fontSize="2xl" fontWeight="bold">
								Reset Password
							</Text>

							<Field.Root>
								<Field.Label>Email</Field.Label>
								<Input
									type="email"
									value={formData.email}
									onChange={e =>
										setFormData({ ...formData, email: e.target.value })
									}
									placeholder="Enter your email"
								/>
							</Field.Root>

							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={isSubmitting}
							>
								Send Reset Code
							</Button>

							<Button
								variant="ghost"
								onClick={() => setShowForgotPassword(false)}
							>
								Back to Sign In
							</Button>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		)
	}

	return (
		<>
			<Toaster />
			<Card.Root>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit} width="100%">
						<VStack gap={4}>
							<Text fontSize="2xl" fontWeight="bold">
								Sign In
							</Text>

							<Field.Root>
								<Field.Label>Email</Field.Label>
								<Input
									type="email"
									value={formData.email}
									onChange={e =>
										setFormData({ ...formData, email: e.target.value })
									}
									placeholder="Enter your email"
								/>
							</Field.Root>

							<Field.Root>
								<Field.Label>Password</Field.Label>
								<Input
									type="password"
									value={formData.password}
									onChange={e =>
										setFormData({ ...formData, password: e.target.value })
									}
									placeholder="Enter your password"
								/>
							</Field.Root>

							{/* <VStack paddingTop={6}> */}
							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={isSubmitting}
							>
								Sign In
							</Button>
							<Link
								color="blue.500"
								onClick={() => setShowForgotPassword(true)}
								_hover={{ textDecoration: 'underline', cursor: 'pointer' }}
							>
								Forgot Password?
							</Link>
							<Link
								color="blue.500"
								href="/auth/signup"
								_hover={{ textDecoration: 'underline' }}
							>
								Don't have an account? Sign Up
							</Link>
							{/* </VStack> */}
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
