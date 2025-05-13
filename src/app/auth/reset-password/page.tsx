'use client'

import { ResetPasswordForm } from '@/components/auth'
import { Box } from '@chakra-ui/react'

export default function ResetPasswordPage() {
	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			p={4}
		>
			<Box maxW="md" w="100%">
				<ResetPasswordForm />
			</Box>
		</Box>
	)
}
