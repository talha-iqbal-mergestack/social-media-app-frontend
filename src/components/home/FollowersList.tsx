'use client'

import {
	Box,
	VStack,
	HStack,
	Text,
	Grid,
	GridItem,
	Heading,
	Spinner,
	Center,
	Alert,
} from '@chakra-ui/react'
import { AvatarComponent } from '@/components/ui/avatar'
import { useFollowersAndFollowingList } from '@/hooks/use-followers-and-following-list'

export const FollowersList = () => {
	const { followers, isLoading, error } = useFollowersAndFollowingList()
	return (
		<Box>
			<Box as="main" maxW="800px" mx="auto" p={4}>
				<Heading as="h1" fontSize="2xl" fontWeight="bold" mb={6}>
					People Who Follow You
				</Heading>
				{isLoading ? (
					<Center py={8}>
						<Spinner size="lg" color="blue.500" />
					</Center>
				) : error ? (
					<Alert.Root status="error">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Title>Failed to load followers</Alert.Title>
						</Alert.Content>
					</Alert.Root>
				) : followers.length === 0 ? (
					<Alert.Root status="info">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Title>No Followers</Alert.Title>
							<Alert.Description>
								{`You don't have any followers yet`}
							</Alert.Description>
						</Alert.Content>
					</Alert.Root>
				) : (
					<Grid
						templateColumns={{
							base: '1fr',
							md: 'repeat(2, 1fr)',
							lg: 'repeat(3, 1fr)',
						}}
						gap={4}
					>
						{followers.map(user => (
							<GridItem key={user.id}>
								<Box bg="white" p={4} borderRadius="md" shadow="sm" h="full">
									<VStack align="start" gap={3}>
										<HStack gap={3}>
											<AvatarComponent name={user.name} avatar={user.avatar} />
											<Box>
												<Text fontWeight="bold">{user.name}</Text>
												<Text fontSize="sm" color="gray.500">
													{user.email}
												</Text>
											</Box>
										</HStack>
									</VStack>
								</Box>
							</GridItem>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	)
}
