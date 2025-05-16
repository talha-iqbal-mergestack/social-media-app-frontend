'use client'

import { Box } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

import { SetNewPasswordForm } from '@/components/auth'
import { Suspense } from 'react'

function Page() {
	const searchParams = useSearchParams()
	const email = searchParams.get('email') || ''

	return (
		<Box maxW="md" w="100%">
			<SetNewPasswordForm email={email} />
		</Box>
	)
}

export default function VerifyResetPasswordPage() {
	return (
		<Suspense>
			<Page />
		</Suspense>
	)
}
