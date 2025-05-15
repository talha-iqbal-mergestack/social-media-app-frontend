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
			<Card.Root
				maxW="md"
				mx="auto"
				boxShadow="xl"
				border="none"
				// bgColor="white/40"
				// backdropFilter="blur(25px)"
				// border="1px solid white/30"
			>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
						<VStack gap={4}>
							<Box textAlign="center" mb={6}>
								<Text
									fontSize="3xl"
									fontWeight="800"
									width="auto"
									color="primary"
								>
									Social Wave
								</Text>
								<Text fontSize="xl" color="gray.500">
									Create your free account
								</Text>
							</Box>

							<Field.Root invalid={!!errors.name}>
								<Field.Label>Name</Field.Label>
								<Input
									{...register('name')}
									type="text"
									placeholder="Enter your name"
									focusRingColor="primary"
								/>
								<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.email}>
								<Field.Label>Email</Field.Label>
								<Input
									{...register('email')}
									type="email"
									placeholder="Enter your email"
									focusRingColor="primary"
								/>
								<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.password}>
								<Field.Label>Password</Field.Label>
								<Input
									{...register('password')}
									type="password"
									placeholder="Enter your password"
									focusRingColor="primary"
								/>
								<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.confirmPassword}>
								<Field.Label>Confirm Password</Field.Label>
								<Input
									{...register('confirmPassword')}
									type="password"
									placeholder="Confirm your password"
									focusRingColor="primary"
								/>
								<Field.ErrorText>
									{errors.confirmPassword?.message}
								</Field.ErrorText>
							</Field.Root>

							<Button
								boxShadow="xl"
								border="none"
								type="submit"
								bgColor="primary"
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
									unstyled
									color="primary"
									href="/signin"
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
