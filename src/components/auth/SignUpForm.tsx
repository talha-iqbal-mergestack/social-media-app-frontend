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
				// bgColor="white/20"
				// backdropFilter="blur(20px)"
				// border="1px solid white/20"
			>
				<Card.Body>
					<Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
						<VStack gap={4}>
							<Box textAlign="center" mb={6}>
								<Text
									fontSize="3xl"
									fontWeight="800"
									width="auto"
									bgGradient="to-r"
									gradientFrom="blue.200"
									gradientTo="purple.300"
									bgClip="text"
									display="inline-block"
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
									focusRingColor="purple.200"
								/>
								<Field.ErrorText>{errors.name?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.email}>
								<Field.Label>Email</Field.Label>
								<Input
									{...register('email')}
									type="email"
									placeholder="Enter your email"
									focusRingColor="purple.200"
								/>
								<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.password}>
								<Field.Label>Password</Field.Label>
								<Input
									{...register('password')}
									type="password"
									placeholder="Enter your password"
									focusRingColor="purple.200"
								/>
								<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root invalid={!!errors.confirmPassword}>
								<Field.Label>Confirm Password</Field.Label>
								<Input
									{...register('confirmPassword')}
									type="password"
									placeholder="Confirm your password"
									focusRingColor="purple.200"
								/>
								<Field.ErrorText>
									{errors.confirmPassword?.message}
								</Field.ErrorText>
							</Field.Root>

							<Button
								boxShadow="xl"
								border="none"
								type="submit"
								bgGradient="to-r"
								gradientFrom="blue.200"
								gradientTo="purple.300"
								_hover={{
									gradientFrom: 'blue.300',
									gradientTo: 'purple.400',
								}}
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
									color="blue.300"
									href="/auth/signin"
									_hover={{ textDecoration: 'underline', color: 'blue.400' }}
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
