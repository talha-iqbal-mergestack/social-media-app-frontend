import { useQuery } from '@tanstack/react-query'

import { usersApi } from '@/lib/api/user'
import { useAuth } from '@/hooks'
import { User } from '@/types'

export function useFollowSuggestions() {
	const {
		authState: { user },
	} = useAuth()

	const { data, isLoading, error } = useQuery<User[]>({
		queryKey: ['follow-suggestions', user?.sub],
		queryFn: () => usersApi.getFollowSuggestions(user!.sub!),
		enabled: !!user,
	})

	return {
		suggestedUsers: data || [],
		isLoading,
		error,
	}
}
