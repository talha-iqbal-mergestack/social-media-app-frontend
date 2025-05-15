import { useQuery } from '@tanstack/react-query'

import { usersApi } from '@/lib/api/user'
import { useAuthContext } from '@/context/AuthContext'
import { FollowersAndFollowingData } from '@/types'

export function useFollowersAndFollowingList() {
	const {
		authState: { user },
	} = useAuthContext()

	const { data, isLoading, error } = useQuery<FollowersAndFollowingData>({
		queryKey: ['followers-and-following', user?.sub],
		queryFn: () => usersApi.getFollowersAndFollowing(user!.sub!),
		enabled: !!user,
	})

	return {
		followers: data?.followers || [],
		following: data?.following || [],
		isLoading,
		error,
	}
}
