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

import { Tooltip } from '@/components/ui/tooltip'
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
			p={6}
			borderRadius="lg"
			shadow="md"
			h="fit-content"
			minW="330px"
			transition="all 0.2s"
			_hover={{ shadow: 'lg' }}
		>
			<Heading as="h2" fontSize="xl" fontWeight="bold" color="gray.800" mb={5}>
				Users to follow
			</Heading>
			{isLoading ? (
				<Center py={10}>
					<Spinner size="xl" color="primary" borderWidth="3px" />
				</Center>
			) : error ? (
				<Text
					color="red.500"
					fontSize="md"
					fontWeight="medium"
					textAlign="center"
					py={6}
				>
					Failed to load suggestions
				</Text>
			) : suggestedUsers.length === 0 ? (
				<Text
					color="gray.500"
					fontSize="md"
					fontWeight="medium"
					textAlign="center"
					py={6}
				>
					No suggestions available
				</Text>
			) : (
				<VStack gap={4} align="stretch">
					{suggestedUsers.map(user => (
						<HStack
							key={user.id}
							gap={4}
							align="center"
							p={2}
							transition="all 0.2s"
							_hover={{ bg: 'gray.50', transform: 'translateX(4px)' }}
							borderRadius="md"
						>
							<AvatarComponent name={user.name} avatar={user.avatar} />
							<Tooltip content={`${user.name}\n${user.email}`}>
								<Box flex={1} minW={0}>
									<Text
										fontWeight="semibold"
										color="gray.800"
										maxLines={1}
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
									>
										{user.name}
									</Text>
									<Text
										fontSize="sm"
										color="gray.500"
										maxLines={1}
										overflow="hidden"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
									>
										{user.email}
									</Text>
								</Box>
							</Tooltip>
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
								_hover={{ bg: 'primary', color: 'white' }}
								transition="all 0.2s"
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
							fontWeight="medium"
							textAlign="center"
							display="block"
							mt={2}
							transition="all 0.2s"
							_hover={{
								textDecoration: 'none',
								color: 'primary.600',
								transform: 'translateY(-1px)',
							}}
						>
							View all suggestions
						</Link>
					)}
				</VStack>
			)}
		</Box>
	)
}
