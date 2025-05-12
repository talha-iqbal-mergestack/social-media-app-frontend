declare module 'jwt-decode' {
	interface JwtPayload {
		email: string
		roles: string[]
		is_email_verified: boolean
	}
}
