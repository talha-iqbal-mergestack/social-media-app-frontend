'use client'

import { Box } from '@chakra-ui/react'

import { SignInForm } from '@/components/auth'

export default function SignUpPage() {
	return (
		<Box maxW="md" w="100%">
			<SignInForm />
		</Box>
	)
}
