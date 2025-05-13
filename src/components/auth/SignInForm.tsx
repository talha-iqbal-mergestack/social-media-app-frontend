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

import { useSigninForm } from '@/hooks'

export const SignInForm = () => {
	const { form, signinMutation, onSubmit } = useSigninForm()
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
								Sign In
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
							<Field.Root invalid={!!errors.password}>
								<Field.Label>Password</Field.Label>
								<Input
									{...register('password')}
									type="password"
									placeholder="Enter your password"
								/>
								<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
							</Field.Root>
							<Link
								color="blue.500"
								href="/auth/reset-password"
								alignSelf="flex-end"
								_hover={{ textDecoration: 'underline' }}
							>
								Forgot Password?
							</Link>
							<Button
								type="submit"
								colorScheme="blue"
								width="100%"
								loading={signinMutation.isPending}
							>
								Sign In
							</Button>
							<HStack>
								{`Don't have an account?`}
								<Link
									color="blue.500"
									href="/auth/signup"
									_hover={{ textDecoration: 'underline' }}
								>
									Sign Up
								</Link>
							</HStack>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</>
	)
}
