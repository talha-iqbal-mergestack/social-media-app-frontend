'use client'

import { Box } from '@chakra-ui/react'

import { SignUpForm } from '@/components/auth'

export default function SignUpPage() {
	return (
		<Box maxW="md" w="100%">
			<SignUpForm />
		</Box>
	)
}
