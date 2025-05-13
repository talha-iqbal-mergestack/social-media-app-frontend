import { Box, Button, Field, Input, VStack, Card } from '@chakra-ui/react'
import { useResetPasswordOTP, useResetPasswordForm } from '@/hooks'
import { ResendOTP } from '@/components/auth'

interface SetNewPasswordFormProps {
	email: string
}
export const SetNewPasswordForm = ({ email }: SetNewPasswordFormProps) => {
	const { form, verifyPasswordMutation, onSubmit } = useResetPasswordOTP(email)
	const { resetPasswordMutation } = useResetPasswordForm()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	const handleResend = () => {
		resetPasswordMutation.mutate({ email })
	}

	return (
		<Card.Root>
			<Card.Body>
				<Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
					<VStack gap={4}>
						<Field.Root invalid={!!errors.code}>
							<Field.Label>OTP Code sent to {email}</Field.Label>
							<Input
								type="text"
								{...register('code')}
								focusRingColor="primary"
							/>
							<Field.ErrorText>{errors.code?.message}</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors.password}>
							<Field.Label>New Password</Field.Label>
							<Input
								type="password"
								{...register('password')}
								focusRingColor="primary"
							/>
							<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
						</Field.Root>

						<Field.Root invalid={!!errors.confirmPassword}>
							<Field.Label>Confirm Password</Field.Label>
							<Input
								type="password"
								{...register('confirmPassword')}
								focusRingColor="primary"
							/>
							<Field.ErrorText>
								{errors.confirmPassword?.message}
							</Field.ErrorText>
						</Field.Root>

						<Button
							type="submit"
							colorScheme="blue"
							width="100%"
							loading={verifyPasswordMutation.isPending}
						>
							Reset Password
						</Button>

						<ResendOTP
							onResend={handleResend}
							isLoading={resetPasswordMutation.isPending}
						/>
					</VStack>
				</Box>
			</Card.Body>
		</Card.Root>
	)
}
