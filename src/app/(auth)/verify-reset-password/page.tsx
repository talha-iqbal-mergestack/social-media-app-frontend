'use client'

import { Box } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

import { SetNewPasswordForm } from '@/components/auth'

export default function VerifyResetPasswordPage() {
	const searchParams = useSearchParams()
	const email = searchParams.get('email') || ''

	return (
		<Box maxW="md" w="100%">
			<SetNewPasswordForm email={email} />
		</Box>
	)
}
