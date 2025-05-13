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
import { AvatarComponent } from '@/components/ui/avatar'
import { usePostsForm } from '@/hooks/use-posts-form'

export const PostsFeed = () => {
	const {
		form,
		posts,
		onSubmit,
		onLike,
		createPostMutation,
		likePostMutation,
	} = usePostsForm()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	return (
		<Box>
			<Box as="main" maxW="800px" mx="auto" p={4}>
				<Box h="auto" bg="white" p={4} borderRadius="md" shadow="sm" mb={6}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Field.Root invalid={!!errors.content}>
							<Input
								{...register('content')}
								placeholder="What's on your mind?"
								size="lg"
								mb={4}
								focusRingColor="purple.200"
							/>
							<Field.ErrorText>{errors.content?.message}</Field.ErrorText>
						</Field.Root>
						<Box textAlign="right">
							<Button type="submit" loading={createPostMutation.isPending}>
								Post
							</Button>
						</Box>
					</form>
				</Box>
				<VStack gap={4} align="stretch">
					{posts.map(post => (
						<Box key={post.id} bg="white" p={4} borderRadius="md" shadow="sm">
							<HStack gap={3} mb={4}>
								<AvatarComponent
									name={post.author.name}
									avatar={post.author.avatar}
								/>
								<Box>
									<Text fontWeight="bold">{post.author.name}</Text>
									<Text fontSize="sm" color="gray.500">
										{post.timestamp}
									</Text>
								</Box>
							</HStack>
							<Text mb={4}>{post.content}</Text>
							<HStack gap={2}>
								<IconButton
									aria-label="Like post"
									variant="surface"
									size="sm"
									onClick={() => onLike(post.id)}
									loading={likePostMutation.isPending}
								>
									{post.likes > 0 ? <AiFillHeart /> : <AiOutlineHeart />}
								</IconButton>
								{post.likes > 0 && (
									<Text fontSize="sm" color="gray.500">
										{post.likes} likes
									</Text>
								)}
							</HStack>
						</Box>
					))}
				</VStack>
			</Box>
		</Box>
	)
}
