import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/lib/api/user'
import { useAuthContext } from '@/context/AuthContext'
import { User } from '@/types/user'

export function useFollowSuggestions() {
	const {
		authState: { user },
	} = useAuthContext()

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
