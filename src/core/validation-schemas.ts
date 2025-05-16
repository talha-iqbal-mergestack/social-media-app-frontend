import { string, object } from 'zod'

import {
	INVALID_PASSWORD_ERROR,
	INVALID_USERNAME_ERROR,
	NON_SIMILAR_PASSWORDS_ERROR,
	INVALID_OTP_ERROR,
	NO_SPACES_IN_PASSWORD_ERROR,
	INVALID_POST_CONTENT_ERROR,
	POST_CONTENT_MAX_LENGTH_ERROR,
	INVALID_OTP_TYPE_ERROR,
	INVALID_USERNAME_CHARACTERS_ERROR,
	INVALID_EMAIL_ERROR,
} from '@/core/constants'

export const signinSchema = object({
	email: string().email(INVALID_EMAIL_ERROR),
	password: string()
		.regex(/^[^\s]+$/, NO_SPACES_IN_PASSWORD_ERROR)
		.min(8, INVALID_PASSWORD_ERROR),
})

export const signupSchema = object({
	email: string().email(INVALID_EMAIL_ERROR),
	name: string()
		.regex(
			/^(?=.*[a-zA-Z])[a-zA-Z0-9_\s-]+$/,
			INVALID_USERNAME_CHARACTERS_ERROR
		)
		.min(1, INVALID_USERNAME_ERROR),
	password: string()
		.regex(/^[^\s]+$/, NO_SPACES_IN_PASSWORD_ERROR)
		.min(8, INVALID_PASSWORD_ERROR),
	confirmPassword: string()
		.regex(/^[^\s]+$/, NO_SPACES_IN_PASSWORD_ERROR)
		.min(8, INVALID_PASSWORD_ERROR),
}).refine(data => data.password === data.confirmPassword, {
	message: NON_SIMILAR_PASSWORDS_ERROR,
	path: ['confirmPassword'],
})

export const resetPasswordSchema = object({
	email: string().email(INVALID_EMAIL_ERROR),
})

export const emailVerificationSchema = object({
	email: string().email(INVALID_EMAIL_ERROR),
	code: string()
		.regex(/^\d{4}$/, INVALID_OTP_TYPE_ERROR)
		.min(4, INVALID_OTP_ERROR),
})

export const resetPasswordVerificationSchema = object({
	email: string().email(INVALID_EMAIL_ERROR),
	code: string().regex(/^\d{4}$/, INVALID_OTP_ERROR),
	password: string()
		.regex(/^[^\s]+$/, NO_SPACES_IN_PASSWORD_ERROR)
		.min(8, INVALID_PASSWORD_ERROR),
	confirmPassword: string()
		.regex(/^[^\s]+$/, NO_SPACES_IN_PASSWORD_ERROR)
		.min(8, INVALID_PASSWORD_ERROR),
}).refine(data => data.password === data.confirmPassword, {
	message: NON_SIMILAR_PASSWORDS_ERROR,
	path: ['confirmPassword'],
})

export const postSchema = object({
	text: string()
		.min(1, INVALID_POST_CONTENT_ERROR)
		.max(500, POST_CONTENT_MAX_LENGTH_ERROR),
})
