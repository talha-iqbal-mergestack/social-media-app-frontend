'use client'

import {
	Box,
	Input,
	Button,
	VStack,
	HStack,
	Text,
	IconButton,
	Field,
} from '@chakra-ui/react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { AvatarComponent } from '@/components/ui/avatar'
import { usePostsForm } from '@/hooks/use-posts-form'
import { useAuthContext } from '@/context/AuthContext'
import { LikeDetails, SuggestedUsers } from '@/components/home'

dayjs.extend(relativeTime)

export const PostsFeed = () => {
	const {
		form,
		posts,
		onSubmit,
		onLike,
		onUnlike,
		createPostMutation,
		unlikePostMutation,
		likePostMutation,
		pendinglikePostMutationVariables,
		pendingUnlikePostMutationVariables,
	} = usePostsForm()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	const {
		authState: { user },
	} = useAuthContext()

	return (
		<Box>
			<Box as="main" maxW="1200px" mx="auto" p={4}>
				<HStack align="start" gap={6}>
					<Box flex={1}>
						<Box h="auto" bg="white" p={4} borderRadius="md" shadow="sm" mb={6}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Field.Root invalid={!!errors.text}>
									<Input
										{...register('text')}
										placeholder="What's on your mind?"
										size="lg"
										mb={4}
										focusRingColor="primary"
									/>
									<Field.ErrorText>{errors.text?.message}</Field.ErrorText>
								</Field.Root>
								<Box textAlign="right">
									<Button
										type="submit"
										loading={createPostMutation.isPending}
										backgroundColor="primary"
									>
										Post
									</Button>
								</Box>
							</form>
						</Box>
						<VStack gap={4} align="stretch">
							{posts.map(post => (
								<Box
									key={post.id}
									bg="white"
									p={4}
									borderRadius="md"
									shadow="sm"
								>
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
									<Text mb={4}>{post.text}</Text>
									<HStack gap={2}>
										<IconButton
											aria-label="Like post"
											variant="surface"
											size="sm"
											onClick={() =>
												post.likes.filter(like => like.id === user!.sub)
													.length > 0
													? onUnlike(post.id)
													: onLike(post.id)
											}
											loading={
												(pendinglikePostMutationVariables?.postId === post.id &&
													likePostMutation.isPending) ||
												(pendingUnlikePostMutationVariables?.postId ===
													post.id &&
													unlikePostMutation.isPending)
											}
										>
											{post.likes.filter(like => like.id === user!.sub).length >
											0 ? (
												<AiFillHeart />
											) : (
												<AiOutlineHeart />
											)}
										</IconButton>
										{post.likes.length > 0 && (
											<LikeDetails likes={post.likes} />
										)}
									</HStack>
								</Box>
							))}
						</VStack>
					</Box>
					<Box w="300px" display={{ base: 'none', lg: 'block' }}>
						<SuggestedUsers />
					</Box>
				</HStack>
			</Box>
		</Box>
	)
}
