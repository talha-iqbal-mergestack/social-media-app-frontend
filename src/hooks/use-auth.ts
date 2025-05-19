import { useEffect, useState } from 'react'
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

	const [isAuthCheckLoading, setIsAuthCheckLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const decodedToken = jwtDecode(token)
			setSigninCredsAction(decodedToken)
		}
		setIsAuthCheckLoading(false)
	}, [setSigninCredsAction, setSignoutAction])

	const signup = (data: SignupResponse) => {
		setSignupCredsAction(data)
	}

	const signin = (data: SigninResponse) => {
		localStorage.setItem('token', data.access_token)
		setSigninCredsAction(jwtDecode(data.access_token))
		setIsAuthCheckLoading(false)
	}

	const signout = () => {
		localStorage.removeItem('token')
		setSignoutAction()
		setIsAuthCheckLoading(false)
	}

	return {
		authState: { user, isAuthenticated },
		isLoading: isAuthCheckLoading,
		signup,
		signin,
		signout,
	}
}

export type AuthContext = ReturnType<typeof useAuth>
