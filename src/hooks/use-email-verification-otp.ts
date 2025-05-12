import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { EmailVerificationFormValues } from '@/types'
import { emailVerificationSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'

export function useEmailVerificationOTP(email: string) {
	const router = useRouter()

	const form = useForm<EmailVerificationFormValues>({
		resolver: zodResolver(emailVerificationSchema),
		defaultValues: {
			email,
			code: '',
		},
	})

	const verifyEmailMutation = useMutation({
		mutationFn: authApi.verifyEmail,
		onSuccess: () => {
			toaster.success({
				description: 'Email verified successfully!',
			})
			router.push('/auth/signin')
		},
		onError: error => {
			toaster.error({
				description: error.message || 'Failed to verify email',
			})
		},
	})

	const onSubmit: SubmitHandler<EmailVerificationFormValues> = data => {
		verifyEmailMutation.mutate(data)
	}

	return {
		form,
		verifyEmailMutation,
		onSubmit,
	}
}
