import { JwtPayload as OriginalJwtPayload } from 'jwt-decode'
declare module 'jwt-decode' {
	export interface JwtPayload extends OriginalJwtPayload {
		name: string
		email: string
		roles: string[]
		is_email_verified: boolean
	}
}
