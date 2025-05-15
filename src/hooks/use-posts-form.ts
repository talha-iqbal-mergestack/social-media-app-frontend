import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { postsApi } from '@/lib/api/posts'
import { PostFormValues } from '@/types'
import { postSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'
import { useAuthContext } from '@/context/AuthContext'

export function usePostsForm() {
	const queryClient = useQueryClient()
	const {
		authState: { user },
	} = useAuthContext()

	const form = useForm<PostFormValues>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			text: '',
		},
	})

	const { data: posts = [] } = useQuery({
		queryKey: ['posts'],
		queryFn: postsApi.getPosts,
	})

	const createPostMutation = useMutation({
		mutationFn: postsApi.createPost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] })
			form.reset()
			toaster.success({
				description: 'Post created successfully',
			})
		},
		onError: error => {
			toaster.error({
				description: error.message || 'An error occurred while creating a post',
			})
		},
	})

	const likePostMutation = useMutation({
		mutationFn: ({ postId }: { postId: string }) => postsApi.likePost(postId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to like post',
			})
		},
	})

	const pendinglikePostMutationVariables = likePostMutation.variables

	const unlikePostMutation = useMutation({
		mutationFn: ({ postId }: { postId: string }) => postsApi.unlikePost(postId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to like post',
			})
		},
	})

	const pendingUnlikePostMutationVariables = unlikePostMutation.variables

	const onSubmit = (values: PostFormValues) => {
		if (!user) {
			toaster.error({
				description: 'You must be logged in to create a post',
			})
			return
		}
		createPostMutation.mutate(values)
	}

	const onLike = (postId: string) => {
		if (!user) {
			toaster.error({
				description: 'You must be logged in to like a post',
			})
			return
		}
		likePostMutation.mutate({ postId })
	}

	const onUnlike = (postId: string) => {
		if (!user) {
			toaster.error({
				description: 'You must be logged in to unlike a post',
			})
			return
		}
		unlikePostMutation.mutate({ postId })
	}

	return {
		form,
		posts,
		onSubmit,
		onLike,
		onUnlike,
		unlikePostMutation,
		pendingUnlikePostMutationVariables,
		createPostMutation,
		likePostMutation,
		pendinglikePostMutationVariables,
	}
}
