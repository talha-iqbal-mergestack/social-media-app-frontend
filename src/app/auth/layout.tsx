'use client'

import { Grid, GridItem, Box, Text, Image } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Grid
			minH="100vh"
			templateColumns={{ base: '1fr', md: '1fr 1fr' }}
			gap={0}
			bgImage={'url("/auth-backdrop.jpg")'}
			bgRepeat="no-repeat"
			bgSize="cover"
		>
			<GridItem
				display={{ base: 'none', md: 'flex' }}
				flexDirection="column"
				overflow="hidden"
			>
				<Box
					display="flex"
					flexDirection="column"
					textAlign="center"
					alignItems="center"
					justifyContent="center"
				>
					<Image src="/app-logo.png" alt="Social Wave logo" maxW="400px" />
					<Text fontSize="5xl" fontWeight="bold" mb={4} color="white">
						Your Social, Your Way.
					</Text>
					<Text fontSize="3xl" color="white">
						Create. Discover. Belong.
					</Text>
				</Box>
			</GridItem>
			<GridItem
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				position="relative"
				backgroundColor="transparent"
			>
				{children}
			</GridItem>
		</Grid>
	)
}
