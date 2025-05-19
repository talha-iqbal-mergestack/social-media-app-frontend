'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { useAuth } from '@/hooks'
import { AvatarComponent } from '@/components/ui/avatar'
import { NavigationDrawer } from '@/components/ui/drawer'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const {
		authState: { isAuthenticated, user },
		isLoading,
	} = useAuth()
	const router = useRouter()
	const { open, onOpen, onClose, setOpen } = useDisclosure()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/signin')
		}
	}, [isLoading, isAuthenticated, router])

	if (!isAuthenticated) {
		return null
	}

	return (
		<Box minH="100vh" display="flex" flexDirection="column">
			<Box
				position="sticky"
				top="0"
				zIndex="max"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				p={4}
				backgroundColor="secondary"
			>
				<AvatarComponent
					name={user!.name}
					avatar="user!.avatar"
					onClick={onOpen}
				/>
				<Button
					backgroundColor="primary"
					size="sm"
					onClick={() => {
						localStorage.removeItem('token')
						router.push('/signin')
					}}
				>
					Sign Out
				</Button>
			</Box>
			{children}
			<NavigationDrawer
				isOpen={open}
				onClose={onClose}
				setOpen={setOpen}
				user={user!}
			/>
		</Box>
	)
}
