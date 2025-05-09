import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { SignupFormValues } from '@/types'
import { useAuth } from '@/hooks'
import { signupSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'

export function useSignupForm() {
	const router = useRouter()
	const { signup } = useAuth()

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: '',
			name: '',
			// contactNumber: '',
			password: '',
			confirmPassword: '',
		},
	})

	const signupMutation = useMutation({
		mutationFn: authApi.signup,
		onSuccess: data => {
			signup(data)
			router.push('/auth/signin')
		},
		onError: error => {
			toaster.error({
				description: error.message || 'An error occurred during signup',
			})
		},
	})

	const onSubmit: SubmitHandler<SignupFormValues> = data => {
		const {
			email,
			confirmPassword: password,
			name,
			// contactNumber
		} = data
		signupMutation.mutate({
			email,
			password,
			name,
			// contactNumber
		})
	}

	return {
		form,
		signupMutation,
		onSubmit,
	}
}
