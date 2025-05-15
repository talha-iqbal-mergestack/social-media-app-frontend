'use client'

import { createContext, ReactNode, useContext } from 'react'

import { useAuth, AuthContext as AuthContextType } from '@/hooks'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth()

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}

	return context
}
