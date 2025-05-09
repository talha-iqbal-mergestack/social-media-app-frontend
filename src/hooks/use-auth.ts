import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import { SigninResponse, SignupResponse } from '@/types'
import { useStore } from '@/store'

export function useAuth() {
	const {
		user,
		isAuthenticated,
		setSignupCredsAction,
		setSigninCredsAction,
		setSignoutAction,
	} = useStore()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwtDecode(token)
			setSigninCredsAction(user)
		}
	}, [setSigninCredsAction])

	const signup = (data: SignupResponse) => {
		setSignupCredsAction(data)
	}

	const signin = (data: SigninResponse) => {
		localStorage.setItem('token', data.access_token)
		setSigninCredsAction(jwtDecode(data.access_token))
	}

	const signout = () => {
		localStorage.removeItem('token')
		setSignoutAction()
	}

	return {
		authState: { user, isAuthenticated },
		signup,
		signin,
		signout,
	}
}

export type AuthContext = ReturnType<typeof useAuth>
