import { apiClient } from '@/lib/api'
import { Post, PostFormValues } from '@/types'

export const postsApi = {
	getPosts: () =>
		apiClient<{ body: Post[] }>('/posts', {
			method: 'GET',
		}),

	createPost: (data: PostFormValues & { author: Post['author'] }) =>
		apiClient<{ body: Post }>('/posts', {
			method: 'POST',
			data,
		}),

	likePost: (postId: string) =>
		apiClient<{ body: Post }>(`/posts/${postId}/like`, {
			method: 'POST',
		}),
}
