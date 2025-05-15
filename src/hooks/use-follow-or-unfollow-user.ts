import { useMutation, useQueryClient } from '@tanstack/react-query'

import { usersApi } from '@/lib/api/user'
import { useAuthContext } from '@/context/AuthContext'
import { toaster } from '@/components/ui/toaster'

export function useFollowOrUnfollowUser() {
	const queryClient = useQueryClient()
	const {
		authState: { user },
	} = useAuthContext()

	const followMutation = useMutation({
		mutationFn: ({ userId }: { userId: string }) => usersApi.followUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['follow-suggestions', user?.sub],
			})
			queryClient.invalidateQueries({
				queryKey: ['posts'],
			})
		},
		onError: error => {
			toaster.error({
				description:
					error.message || 'An error occurred while following the user',
			})
		},
	})

	const followMutationPendingVariables = followMutation.variables

	const unfollowMutation = useMutation({
		mutationFn: ({ userId }: { userId: string }) =>
			usersApi.unfollowUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['followers-and-following', user?.sub],
			})
		},
		onError: error => {
			toaster.error({
				description:
					error.message || 'An error occurred while unfollowing the user',
			})
		},
	})

	const unfollowMutationPendingVariables = unfollowMutation.variables

	return {
		follow: (userId: string) => followMutation.mutate({ userId }),
		unfollow: (userId: string) => unfollowMutation.mutate({ userId }),
		isFollowingLoading: followMutation.isPending,
		isUnfollowingLoading: unfollowMutation.isPending,
		error: followMutation.error || unfollowMutation.error,
		followMutationPendingVariables,
		unfollowMutationPendingVariables,
	}
}
