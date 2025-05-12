import { Box, Button, Field, Input, VStack, Text, Card } from '@chakra-ui/react'
import { useEmailVerificationOTP, useSignupForm } from '@/hooks'
import { ResendOTP } from '@/components/auth/resend-otp'

interface OTPVerificationProps {
	email: string
}

export const OTPVerification = ({ email }: OTPVerificationProps) => {
	const { form, verifyEmailMutation, onSubmit } = useEmailVerificationOTP(email)
	const { sendVerificationMutation } = useSignupForm()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	const handleResend = () => {
		sendVerificationMutation.mutate(email)
	}

	return (
		<>
			<Card.Root>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
						<VStack gap={4}>
							<Text>
								Please enter the verification code sent to{' '}
								<Text as="span" fontWeight="bold">
									{email}
								</Text>
							</Text>
							<Field.Root invalid={!!errors.code}>
								<Field.Label>Verification Code</Field.Label>
								<Input
									type="text"
									placeholder="Enter OTP"
									{...register('code')}
								/>
								<Field.ErrorText>{errors.code?.message}</Field.ErrorText>
							</Field.Root>

							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={verifyEmailMutation.isPending}
							>
								Verify
							</Button>

							<ResendOTP
								onResend={handleResend}
								isLoading={sendVerificationMutation.isPending}
							/>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
