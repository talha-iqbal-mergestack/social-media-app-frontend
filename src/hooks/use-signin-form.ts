import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authApi } from '@/lib/api/auth'
import { SigninFormValues } from '@/types'
import { signinSchema } from '@/core/validation-schemas'
import { toaster } from '@/components/ui/toaster'
import { useAuthContext } from '@/context/AuthContext'
import { useEffect } from 'react'

export function useSigninForm() {
	const router = useRouter()
	const {
		signin,
		authState: { user },
		isLoading,
	} = useAuthContext()

	const defaultValues = {
		email: user?.email || '',
		password: '',
	}

	const form = useForm<SigninFormValues>({
		resolver: zodResolver(signinSchema),
		defaultValues,
	})

	const signinMutation = useMutation({
		mutationFn: authApi.signin,
		onSuccess: data => {
			signin(data)
			router.push('/home')
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

	useEffect(() => {
		if (!isLoading) {
			defaultValues.email = user?.email || ''
		}
		form.reset(defaultValues)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	return {
		form,
		signinMutation,
		onSubmit,
	}
}
