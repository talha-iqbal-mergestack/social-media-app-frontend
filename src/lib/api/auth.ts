import { apiClient } from '@/lib/api'
import {
	SigninCredentials,
	SigninResponse,
	SignupCredentials,
	SignupResponse,
	ResetPasswordFormValues,
	EmailVerificationFormValues,
	ResetPasswordVerificationFormValues,
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

	verifyResetPassword: (data: ResetPasswordVerificationFormValues) =>
		apiClient<void>(`/auth/reset-password-with-code/${data.code}`, {
			method: 'POST',
			data: { password: data.password },
		}),

	sendEmailVerificationCode: (email: string) =>
		apiClient<void>('/auth/send-signup-confirmation-code', {
			method: 'POST',
			data: { email },
		}),

	verifyEmail: (data: EmailVerificationFormValues) =>
		apiClient<void>(`/auth/confirm-signup-with-code/${data.code}`, {
			method: 'POST',
			data: { email: data.email },
		}),
}
