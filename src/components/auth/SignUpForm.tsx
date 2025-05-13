import {
	Box,
	Button,
	Input,
	VStack,
	Text,
	Link,
	Field,
	Card,
	HStack,
} from '@chakra-ui/react'

import { useSignupForm } from '@/hooks'

export const SignUpForm = () => {
	const { form, signupMutation, sendVerificationMutation, onSubmit } =
		useSignupForm()
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
								Sign Up
							</Text>

							<Field.Root invalid={!!errors.name}>
								<Field.Label>Name</Field.Label>
								<Input
									{...register('name')}
									type="text"
									placeholder="Enter your name"
								/>
								<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.email}>
								<Field.Label>Email</Field.Label>
								<Input
									{...register('email')}
									type="email"
									placeholder="Enter your email"
								/>
								<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.password}>
								<Field.Label>Password</Field.Label>
								<Input
									{...register('password')}
									type="password"
									placeholder="Enter your password"
								/>
								<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.confirmPassword}>
								<Field.Label>Confirm Password</Field.Label>
								<Input
									{...register('confirmPassword')}
									type="password"
									placeholder="Confirm your password"
								/>
								<Field.ErrorText>
									{errors.confirmPassword?.message}
								</Field.ErrorText>
							</Field.Root>

							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={
									signupMutation.isPending || sendVerificationMutation.isPending
								}
							>
								Sign Up
							</Button>
							<HStack>
								Already have an account?
								<Link
									color="blue.500"
									href="/auth/signin"
									_hover={{ textDecoration: 'underline' }}
								>
									Sign In
								</Link>
							</HStack>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
