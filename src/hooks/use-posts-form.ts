import { useForm, SubmitHandler } from 'react-hook-form'
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
			content: '',
		},
	})

	const { data: posts = [] } = useQuery({
		queryKey: ['posts'],
		queryFn: postsApi.getPosts,
		select: data => data.body,
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
		mutationFn: postsApi.likePost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to like post',
			})
		},
	})

	const onSubmit: SubmitHandler<PostFormValues> = data => {
		if (!user) {
			toaster.error({
				description: 'You must be logged in to create a post',
			})
			return
		}
		createPostMutation.mutate({
			...data,
			author: {
				name: user.name,
				avatar: '',
				email: user.email,
			},
		})
	}

	const onLike = (postId: string) => {
		if (!user) {
			toaster.error({
				description: 'You must be logged in to like a post',
			})
			return
		}
		likePostMutation.mutate(postId)
	}

	return {
		form,
		posts,
		onSubmit,
		onLike,
		createPostMutation,
		likePostMutation,
	}
}
