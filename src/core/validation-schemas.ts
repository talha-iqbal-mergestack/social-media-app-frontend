import { string, object } from 'zod'

import {
	INVALID_PASSWORD_ERROR,
	INVALID_USERNAME_ERROR,
	NON_SIMILAR_PASSWORDS_ERROR,
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
