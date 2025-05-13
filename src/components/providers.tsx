'use client'

import { AuthProvider } from '@/context/AuthContext'
import {
	ChakraProvider,
	createSystem,
	defineConfig,
	defaultConfig,
} from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				primary: {
					value: '#2e5672',
				},
			},
		},
	},
})

const system = createSystem(defaultConfig, config)

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider value={system}>
				<AuthProvider>{children}</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	)
}
