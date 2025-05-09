import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { SigninFormValues } from '@/types'
import { useAuth } from '@/hooks'
import { signinSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'

export function useSigninForm() {
	const router = useRouter()
	const { signin } = useAuth()

	const form = useForm<SigninFormValues>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const signinMutation = useMutation({
		mutationFn: authApi.signin,
		onSuccess: data => {
			signin(data)
			router.push('/')
		},
		onError: error => {
			toaster.error({
				description: error.message || 'An error occurred during signup',
			})
		},
	})

	const onSubmit: SubmitHandler<SigninFormValues> = data => {
		signinMutation.mutate(data)
	}

	return {
		form,
		signinMutation,
		onSubmit,
	}
}
