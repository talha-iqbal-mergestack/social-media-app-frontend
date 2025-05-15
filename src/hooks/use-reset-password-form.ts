import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { ResetPasswordFormValues } from '@/types'
import { resetPasswordSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'

export function useResetPasswordForm() {
	const router = useRouter()

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: '',
		},
	})

	const resetPasswordMutation = useMutation({
		mutationFn: authApi.resetPassword,
		onSuccess: (_, variables) => {
			toaster.success({
				description: 'Password reset code sent successfully',
			})
			router.push(
				`/verify-reset-password?email=${encodeURIComponent(variables.email)}`
			)
		},
		onError: error => {
			toaster.error({
				description: error.message || 'An error occurred during password reset',
			})
		},
	})

	const onSubmit: SubmitHandler<ResetPasswordFormValues> = data => {
		resetPasswordMutation.mutate(data)
	}

	return {
		form,
		resetPasswordMutation,
		onSubmit,
	}
}
