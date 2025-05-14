import { string, object } from 'zod'

import {
	INVALID_PASSWORD_ERROR,
	INVALID_USERNAME_ERROR,
	NON_SIMILAR_PASSWORDS_ERROR,
	INVALID_OTP_ERROR,
} from '@/core/constants'

export const signinSchema = object({
	email: string().email(),
	password: string().min(8, INVALID_PASSWORD_ERROR),
})

export const signupSchema = object({
	email: string().email(),
	name: string().min(1, INVALID_USERNAME_ERROR),
	password: string().min(8, INVALID_PASSWORD_ERROR),
	confirmPassword: string().min(8, INVALID_PASSWORD_ERROR),
}).refine(data => data.password === data.confirmPassword, {
	message: NON_SIMILAR_PASSWORDS_ERROR,
	path: ['confirmPassword'],
})

export const resetPasswordSchema = object({
	email: string().email(),
})

export const emailVerificationSchema = object({
	email: string().email(),
	code: string().length(4, INVALID_OTP_ERROR),
})

export const resetPasswordVerificationSchema = object({
	email: string().email(),
	code: string().length(4, INVALID_OTP_ERROR),
	password: string().min(8, INVALID_PASSWORD_ERROR),
	confirmPassword: string().min(8, INVALID_PASSWORD_ERROR),
}).refine(data => data.password === data.confirmPassword, {
	message: NON_SIMILAR_PASSWORDS_ERROR,
	path: ['confirmPassword'],
})

export const postSchema = object({
	text: string()
		.min(1, 'Post content is required')
		.max(500, 'Post content must be less than 500 characters'),
})
