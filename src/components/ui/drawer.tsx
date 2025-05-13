'use client'

import {
	Avatar,
	CloseButton,
	Drawer,
	Flex,
	Link,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

interface NavigationDrawerProps {
	isOpen: boolean
	onClose: () => void
	setOpen: (open: boolean) => void
	user: {
		name: string
		email: string
		avatar?: string
	}
}

export const NavigationDrawer = ({
	isOpen,
	onClose,
	setOpen,
	user,
}: NavigationDrawerProps) => {
	const pathname = usePathname()
	const menuItems = [
		{ label: 'Feed', href: '/' },
		{ label: 'My Profile', href: '/profile' },
		{ label: 'Following', href: '/following' },
		{ label: 'Followers', href: '/followers' },
	]

	return (
		<Drawer.Root
			open={isOpen}
			closeOnInteractOutside
			onOpenChange={e => setOpen(e.open)}
			placement="start"
		>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.Header p={4}>
						<Flex alignItems="center" gap={4}>
							<Avatar.Root variant="subtle">
								<Avatar.Fallback name={user.name} />
								<Avatar.Image src={user.avatar} />
							</Avatar.Root>
							<VStack align="start" gap={1}>
								<Text fontWeight="bold">{user.name}</Text>
								<Text fontSize="sm" color="gray.600">
									{user.email}
								</Text>
							</VStack>
						</Flex>
					</Drawer.Header>
					<Drawer.Body p={0}>
						<Stack>
							{menuItems.map(item => (
								<Link
									unstyled
									key={item.href}
									href={item.href}
									p={4}
									bg={pathname === item.href ? 'gray.100' : 'transparent'}
									_hover={{
										bg: pathname === item.href ? 'gray.100' : 'gray.50',
									}}
									onClick={onClose}
								>
									<Text>{item.label}</Text>
								</Link>
							))}
						</Stack>
					</Drawer.Body>
					<Drawer.CloseTrigger asChild>
						<CloseButton size="sm" />
					</Drawer.CloseTrigger>
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	)
}
