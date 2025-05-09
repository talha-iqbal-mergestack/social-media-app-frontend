import { apiClient } from '@/lib/api'
import {
	SigninCredentials,
	SigninResponse,
	SignupCredentials,
	SignupResponse,
	ResetPasswordFormValues,
} from '@/types'

export const authApi = {
	signin: (credentials: SigninCredentials) =>
		apiClient<SigninResponse>('/auth/signin', {
			method: 'POST',
			data: credentials,
		}),

	signup: (credentials: SignupCredentials) =>
		apiClient<SignupResponse>('/users', {
			method: 'POST',
			data: credentials,
		}),

	resetPassword: (data: ResetPasswordFormValues) =>
		apiClient<void>('/auth/send-password-reset-code', {
			method: 'POST',
			data,
		}),
}
