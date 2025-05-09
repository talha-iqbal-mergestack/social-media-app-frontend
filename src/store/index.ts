import { JwtPayload } from 'jwt-decode'
import { create } from 'zustand'

import { SignupResponse } from '@/types'

export interface State {
	user: JwtPayload | SignupResponse | null
	isAuthenticated: boolean
}

interface Actions {
	setSignupCredsAction: (user: SignupResponse) => void
	setSigninCredsAction: (user: JwtPayload) => void
	setSignoutAction: () => void
}

const initialAuthState: State = {
	user: null,
	isAuthenticated: false,
}

export const useStore = create<State & Actions>(set => ({
	...initialAuthState,
	setSignupCredsAction: user => set({ user, isAuthenticated: false }),
	setSigninCredsAction: user => set({ user, isAuthenticated: true }),
	setSignoutAction: () => set(initialAuthState),
}))
