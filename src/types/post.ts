export interface Post {
	id: string
	author: {
		name: string
		avatar: string
		email: string
	}
	content: string
	timestamp: string
	likes: number
}

export interface PostFormValues {
	content: string
}
