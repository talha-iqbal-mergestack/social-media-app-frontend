export interface SignupResponse {
	name: string
	email: string
	roles: string[]
	is_email_verified: boolean
	id: string
	sub: string
}
