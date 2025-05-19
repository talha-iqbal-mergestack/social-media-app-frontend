'use client'

import { Box } from '@chakra-ui/react'

import { ResetPasswordForm } from '@/components/auth'

export default function ResetPasswordPage() {
	return (
		<Box maxW="md" w="100%">
			<ResetPasswordForm />
		</Box>
	)
}
