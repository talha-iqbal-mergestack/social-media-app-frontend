'use client'

import { Home } from '@/components/home/Home'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
	const {
		authState: { isAuthenticated, user },
		isLoading,
	} = useAuthContext()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/auth/signin')
		}
	}, [isLoading, isAuthenticated, router])

	// Don't render anything while checking authentication
	if (!isAuthenticated) {
		return null
	}

	return (
		<Home
			user={{
				name: user!.name,
				email: user!.email,
				// avatar: user!.image,
			}}
		/>
	)
}
