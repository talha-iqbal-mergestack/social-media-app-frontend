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
	ButtonGroup,
	Popover,
} from '@chakra-ui/react'
import {
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineDelete,
} from 'react-icons/ai'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { AvatarComponent } from '@/components/ui/avatar'
import { usePostsForm } from '@/hooks/use-posts-form'
import { useAuth } from '@/hooks'
import { LikeDetails, SuggestedUsers } from '@/components/home'
import { BsEmojiSmile } from 'react-icons/bs'

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
	} = useAuth()

	return (
		<Box>
			<Box as="main" maxW="1200px" mx="auto" p={4}>
				<HStack align="start" gap={6}>
					<Box flex={1}>
						<Box
							h="auto"
							bg="white"
							p={6}
							borderRadius="lg"
							shadow="md"
							mb={6}
							transition="all 0.2s"
							_hover={{ shadow: 'lg' }}
						>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Field.Root invalid={!!errors.text} mb={4}>
									<VStack align="stretch" gap={2} w="100%">
										<Input
											{...register('text')}
											placeholder="What's on your mind?"
											size="lg"
											focusRingColor="primary"
											autoComplete="off"
											_focus={{ transform: 'translateY(-2px)' }}
											transition="all 0.2s"
										/>
									</VStack>
									<Field.ErrorText>{errors.text?.message}</Field.ErrorText>
								</Field.Root>
								<HStack display="flex" justifyContent="space-between">
									<HStack gap={2}>
										<ButtonGroup size="sm" variant="ghost">
											<IconButton
												aria-label="Bold"
												_hover={{ color: 'primary' }}
											>
												<AiOutlineBold />
											</IconButton>
											<IconButton
												aria-label="Italic"
												_hover={{ color: 'primary' }}
											>
												<AiOutlineItalic />
											</IconButton>
										</ButtonGroup>
										<Popover.Root>
											<Popover.Trigger>
												<IconButton
													aria-label="Add emoji"
													size="sm"
													variant="ghost"
													_hover={{ color: 'primary' }}
												>
													<BsEmojiSmile />
												</IconButton>
											</Popover.Trigger>
											<Popover.Content>
												<Popover.Body>
													<Box p={2}>
														{/* Add emoji picker component here */}
													</Box>
												</Popover.Body>
											</Popover.Content>
										</Popover.Root>
									</HStack>
									<Button
										type="submit"
										loading={createPostMutation.isPending}
										backgroundColor="primary"
										_hover={{ transform: 'translateY(-2px)' }}
										transition="all 0.2s"
									>
										Post
									</Button>
								</HStack>
							</form>
						</Box>
						<VStack gap={4} align="stretch">
							{posts.length === 0 ? (
								<Box
									bg="white"
									p={8}
									borderRadius="lg"
									shadow="md"
									textAlign="center"
									transition="all 0.2s"
									_hover={{ shadow: 'lg' }}
								>
									<Text fontSize="xl" fontWeight="bold" color="gray.700" mb={3}>
										No posts yet
									</Text>
									<Text color="gray.500" fontSize="md">
										Start sharing or follow others to see their updates!
									</Text>
								</Box>
							) : (
								posts.map(post => (
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
													post.likes.filter(like => like.id === user!.sub)
														.length > 0
														? onUnlike(post.id)
														: onLike(post.id)
												}
												loading={
													(pendinglikePostMutationVariables?.postId ===
														post.id &&
														likePostMutation.isPending) ||
													(pendingUnlikePostMutationVariables?.postId ===
														post.id &&
														unlikePostMutation.isPending)
												}
											>
												{post.likes.filter(like => like.id === user!.sub)
													.length > 0 ? (
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
								))
							)}
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
