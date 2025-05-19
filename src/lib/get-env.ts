export function getEnv(key: string): string {
	const value = key
	if (!value) {
		throw new Error(
			`Missing environment variable: ${key} is not defined. Please check your .env file and ensure it is loaded correctly.`
		)
	}
	return value
}
