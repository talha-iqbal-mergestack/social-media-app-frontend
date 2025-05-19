import { apiClient } from '@/lib/api'
import { FollowersAndFollowingData, User } from '@/types'

export const usersApi = {
	getFollowersAndFollowing: (userId: string) =>
		apiClient<FollowersAndFollowingData>(
			`/users/${userId}/followers-and-following`,
			{
				method: 'GET',
			}
		),

	getFollowSuggestions: (userId: string) =>
		apiClient<User[]>(`/users/${userId}/follow-suggestions`, {
			method: 'GET',
		}),

	followUser: (userId: string) =>
		apiClient<User>(`/users/${userId}/follow`, {
			method: 'POST',
		}),

	unfollowUser: (userId: string) =>
		apiClient<User>(`/users/${userId}/follow`, {
			method: 'DELETE',
		}),
}
