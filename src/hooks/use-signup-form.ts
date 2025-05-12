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
			password: '',
			confirmPassword: '',
		},
	})

	const sendVerificationMutation = useMutation({
		mutationFn: authApi.sendEmailVerificationCode,
		onSuccess: () => {
			toaster.success({
				description: 'Verification code sent to your email',
			})
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to send verification code',
			})
		},
	})

	const signupMutation = useMutation({
		mutationFn: authApi.signup,
		onSuccess: data => {
			signup(data)
			// Send verification code after successful signup
			sendVerificationMutation.mutate(data.email, {
				onSuccess: () => {
					router.push(
						`/auth/verify-email?email=${encodeURIComponent(data.email)}`
					)
				},
			})
		},
		onError: error => {
			toaster.error({
				description: error.message || 'An error occurred during signup',
			})
		},
	})

	const onSubmit: SubmitHandler<SignupFormValues> = data => {
		const { email, confirmPassword: password, name } = data
		signupMutation.mutate({
			email,
			password,
			name,
		})
	}

	return {
		form,
		signupMutation,
		sendVerificationMutation,
		onSubmit,
	}
}
