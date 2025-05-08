import { useState } from 'react'
import { Box, Button, Field, Input, VStack, Text, Card } from '@chakra-ui/react'
import { Toaster, toaster } from '@/components/ui/toaster'

interface OTPVerificationProps {
	type: 'signup' | 'reset-password'
	email: string
	onVerificationComplete: () => void
}

export const OTPVerification = ({
	type,
	email,
	onVerificationComplete,
}: OTPVerificationProps) => {
	const [otp, setOtp] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			// TODO: Implement API call to verify OTP
			const response = await fetch('/api/verify-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					otp,
					type,
				}),
			})

			if (!response.ok) {
				throw new Error('Invalid OTP')
			}

			toaster.create({
				title: 'Success',
				description:
					type === 'signup'
						? 'Email verified successfully!'
						: 'Password reset OTP verified!',
				type: 'success',
			})

			onVerificationComplete()
		} catch (error) {
			toaster.create({
				title: 'Error',
				description:
					error instanceof Error ? error.message : 'Verification failed',
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Toaster />
			<Card.Root>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit} width="100%">
						<VStack gap={4}>
							<Text>
								Please enter the verification code sent to{' '}
								<Text as="span" fontWeight="bold">
									{email}
								</Text>
							</Text>
							<Field.Root>
								<Field.Label>Verification Code</Field.Label>
								<Input
									type="text"
									placeholder="Enter OTP"
									value={otp}
									onChange={e => setOtp(e.target.value)}
									maxLength={6}
								/>
							</Field.Root>

							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={isSubmitting}
							>
								Verify
							</Button>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
