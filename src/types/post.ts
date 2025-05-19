export interface Post {
	id: string
	text: string
	_poster: {
		name: string
		email: string
		// avatar: string
		id: string
	}
	createdAt: string
	updatedAt: string
	likes: {
		name: string
		email: string
		// avatar: string
		id: string
	}[]
}

export interface PostFormValues {
	text: string
}
