'use client'

import { Box, IconButton, useDisclosure } from '@chakra-ui/react'
import { NavigationDrawer } from '@/components/ui/drawer'
import { LuHam } from 'react-icons/lu'

export interface HomeProps {
	user: {
		name: string
		email: string
		avatar?: string
	}
}

export const Home = ({ user }: HomeProps) => {
	const { open, onOpen, onClose, setOpen } = useDisclosure()

	return (
		<Box>
			<Box as="header" p={4} borderBottom="1px" borderColor="gray.200">
				<IconButton aria-label="Open menu" variant="ghost" onClick={onOpen}>
					<LuHam />
				</IconButton>
			</Box>

			<NavigationDrawer
				isOpen={open}
				onClose={onClose}
				setOpen={setOpen}
				user={user}
			/>

			<Box as="main" p={4}>
				{/* Main content will go here */}
			</Box>
		</Box>
	)
}
