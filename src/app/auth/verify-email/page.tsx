'use client'

import { Box } from '@chakra-ui/react'
import { OTPVerification } from '@/components/auth'
import { useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
	const searchParams = useSearchParams()
	const email = searchParams.get('email') || ''

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			p={4}
		>
			<Box maxW="md" w="100%">
				<OTPVerification email={email} />
			</Box>
		</Box>
	)
}
