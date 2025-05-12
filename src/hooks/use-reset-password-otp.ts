import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { ResetPasswordVerificationFormValues } from '@/types'
import { resetPasswordVerificationSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'

export function useResetPasswordOTP(email: string) {
	const router = useRouter()

	const form = useForm<ResetPasswordVerificationFormValues>({
		resolver: zodResolver(resetPasswordVerificationSchema),
		defaultValues: {
			email,
			code: '',
			password: '',
			confirmPassword: '',
		},
	})

	const verifyPasswordMutation = useMutation({
		mutationFn: authApi.verifyResetPassword,
		onSuccess: () => {
			toaster.success({
				description: 'Password reset successfully!',
			})
			router.push('/auth/signin')
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to reset password',
			})
		},
	})

	const onSubmit: SubmitHandler<ResetPasswordVerificationFormValues> = data => {
		verifyPasswordMutation.mutate(data)
	}

	return {
		form,
		verifyPasswordMutation,
		onSubmit,
	}
}
