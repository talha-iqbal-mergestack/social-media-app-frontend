'use client'

import { Box } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

import { OTPVerification } from '@/components/auth'

export default function VerifyEmailPage() {
	const searchParams = useSearchParams()
	const email = searchParams.get('email') || ''

	return (
		<Box maxW="md" w="100%">
			<OTPVerification email={email} />
		</Box>
	)
}
