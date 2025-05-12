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

import { useResetPasswordForm } from '@/hooks'

export const ResetPasswordForm = () => {
	const { form, resetPasswordMutation, onSubmit } = useResetPasswordForm()
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	return (
		<>
			<Card.Root>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
						<VStack gap={4}>
							<Text fontSize="2xl" fontWeight="bold">
								Reset Password
							</Text>

							<Field.Root invalid={!!errors.email}>
								<Field.Label>Email</Field.Label>
								<Input
									{...register('email')}
									type="email"
									placeholder="Enter your email"
								/>
								<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
							</Field.Root>

							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={resetPasswordMutation.isPending}
							>
								Reset Password
							</Button>

							<Link
								color="blue.500"
								href="/auth/signin"
								_hover={{ textDecoration: 'underline' }}
							>
								Back to Sign In
							</Link>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
