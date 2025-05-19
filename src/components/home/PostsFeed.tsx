'use client'

import {
	Box,
	Input,
	Button,
	VStack,
	HStack,
	Text,
	Field,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useState } from 'react'

import { usePostsForm } from '@/hooks/use-posts-form'
import {
	SuggestedUsers,
	TextStyleControls,
	EmojiPicker,
	PostCard,
} from '@/components/home'

dayjs.extend(relativeTime)

export const PostsFeed = () => {
	const { form, posts, onSubmit, createPostMutation } = usePostsForm()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form

	const [textStyle, setTextStyle] = useState({
		fontWeight: '',
		fontStyle: '',
	})

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
											_placeholder={{
												fontStyle: 'normal',
												fontWeight: 'normal',
											}}
											size="lg"
											focusRingColor="primary"
											autoComplete="off"
											_focus={{ transform: 'translateY(-2px)' }}
											transition="all 0.2s"
											{...textStyle}
										/>
									</VStack>
									<Field.ErrorText>{errors.text?.message}</Field.ErrorText>
								</Field.Root>
								<HStack display="flex" justifyContent="space-between">
									<HStack gap={2}>
										<TextStyleControls
											textStyle={textStyle}
											setTextStyle={setTextStyle}
										/>
										<EmojiPicker />
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
								posts.map(post => <PostCard key={post.id} post={post} />)
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
