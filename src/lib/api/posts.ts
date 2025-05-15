import { apiClient } from '@/lib/api'
import { Post, PostFormValues } from '@/types'

export const postsApi = {
	getPosts: () =>
		apiClient<Post[]>('/posts/feed', {
			method: 'GET',
		}),

	createPost: (data: PostFormValues) =>
		apiClient<{ body: Post }>('/posts', {
			method: 'POST',
			data,
		}),

	likePost: (postId: string) =>
		apiClient<void>(`/posts/${postId}/like`, {
			method: 'POST',
		}),

	unlikePost: (postId: string) =>
		apiClient<void>(`/posts/${postId}/like`, {
			method: 'DELETE',
		}),
}
