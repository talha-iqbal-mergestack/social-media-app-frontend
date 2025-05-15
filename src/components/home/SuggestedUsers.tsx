'use client'

import {
	Box,
	VStack,
	HStack,
	Text,
	Heading,
	Button,
	Spinner,
	Center,
	Link,
} from '@chakra-ui/react'

import { AvatarComponent } from '@/components/ui/avatar'
import { useFollowOrUnfollowUser, useFollowSuggestions } from '@/hooks'

export const SuggestedUsers = () => {
	const { suggestedUsers, isLoading, error } = useFollowSuggestions()
	const { follow, isFollowingLoading, followMutationPendingVariables } =
		useFollowOrUnfollowUser()

	return (
		<Box
			position="sticky"
			top="4"
			bg="white"
			p={4}
			borderRadius="md"
			shadow="sm"
			h="fit-content"
			minW="280px"
		>
			<Heading as="h2" fontSize="lg" mb={4}>
				Users to follow
			</Heading>
			{isLoading ? (
				<Center py={8}>
					<Spinner size="lg" color="blue.500" />
				</Center>
			) : error ? (
				<Text color="red.500" textAlign="center">
					Failed to load suggestions
				</Text>
			) : suggestedUsers.length === 0 ? (
				<Text color="gray.500" textAlign="center">
					No suggestions available
				</Text>
			) : (
				<VStack gap={4} align="stretch">
					{suggestedUsers.map(user => (
						<HStack key={user.id} gap={3} align="center">
							<AvatarComponent name={user.name} avatar={user.avatar} />
							<Box flex={1} minW={0}>
								<Text fontWeight="medium" maxLines={1}>
									{user.name}
								</Text>
								<Text fontSize="sm" color="gray.500" maxLines={1}>
									{user.email}
								</Text>
							</Box>
							<Button
								size="sm"
								variant="outline"
								colorScheme="primary"
								flexShrink={0}
								onClick={() => follow(user.id)}
								loading={
									followMutationPendingVariables?.userId === user.id &&
									isFollowingLoading
								}
							>
								Follow
							</Button>
						</HStack>
					))}
					{suggestedUsers.length > 3 && (
						<Link
							href="/home/suggestions"
							color="primary"
							fontSize="sm"
							textAlign="center"
							display="block"
							_hover={{ textDecoration: 'underline' }}
						>
							View all suggestions
						</Link>
					)}
				</VStack>
			)}
		</Box>
	)
}
