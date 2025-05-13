'use client'

import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
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
	} = useAuthContext()
	const router = useRouter()
	const { open, onOpen, onClose, setOpen } = useDisclosure()

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/auth/signin')
		}
	}, [isLoading, isAuthenticated, router])

	// Don't render anything while checking authentication
	if (isLoading) {
		return (
			<Box
				minH="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				{/* You could add a loading spinner here */}
				Loading...
			</Box>
		)
	}

	// Don't render anything if not authenticated
	if (!isAuthenticated) {
		return null
	}

	return (
		<Box minH="100vh" display="flex" flexDirection="column">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				p={4}
				backgroundColor="gray.300"
				borderBottom="1px"
				borderColor="gray.200"
			>
				<AvatarComponent
					name="user.name"
					avatar="user.avatar"
					onClick={onOpen}
				/>
				<Button
					colorScheme="red"
					size="sm"
					onClick={() => {
						localStorage.removeItem('token')
						router.push('/auth/signin')
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
