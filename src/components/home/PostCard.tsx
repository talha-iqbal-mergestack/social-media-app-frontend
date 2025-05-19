'use client'

import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

import { LikeDetails } from '@/components/home'
import { AvatarComponent } from '@/components/ui/avatar'
import { Post } from '@/types'
import { useAuth, usePostsForm } from '@/hooks'

dayjs.extend(relativeTime)

export function PostCard({ post }: { post: Post }) {
	const {
		onLike,
		onUnlike,
		unlikePostMutation,
		likePostMutation,
		pendinglikePostMutationVariables,
		pendingUnlikePostMutationVariables,
	} = usePostsForm()

	const {
		authState: { user },
	} = useAuth()

	return (
		<Box
			key={post.id}
			bg="white"
			p={6}
			borderRadius="lg"
			shadow="md"
			transition="all 0.2s"
			_hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
		>
			<HStack display="flex" justifyContent="space-between">
				<HStack gap={3} mb={4}>
					<AvatarComponent
						name={post._poster.name}
						// avatar={post._poster.avatar}
					/>
					<Box>
						<Text fontWeight="bold">{post._poster.name}</Text>
						<Text fontSize="sm" color="gray.500">
							{dayjs(post.createdAt).fromNow()}
						</Text>
					</Box>
				</HStack>
				<IconButton
					size="xs"
					borderColor="gray"
					backgroundClip="text"
					color="primary"
					_hover={{ bg: 'primary', color: 'white' }}
				>
					<AiOutlineDelete />
				</IconButton>
			</HStack>
			<Text mb={4}>{post.text}</Text>
			<HStack gap={2}>
				<IconButton
					aria-label="Like post"
					variant="surface"
					size="sm"
					onClick={() =>
						post.likes.filter(like => like.id === user!.sub).length > 0
							? onUnlike(post.id)
							: onLike(post.id)
					}
					loading={
						(pendinglikePostMutationVariables?.postId === post.id &&
							likePostMutation.isPending) ||
						(pendingUnlikePostMutationVariables?.postId === post.id &&
							unlikePostMutation.isPending)
					}
				>
					{post.likes.filter(like => like.id === user!.sub).length > 0 ? (
						<AiFillHeart />
					) : (
						<AiOutlineHeart />
					)}
				</IconButton>
				{post.likes.length > 0 && <LikeDetails likes={post.likes} />}
			</HStack>
		</Box>
	)
}
