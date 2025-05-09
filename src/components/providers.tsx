'use client'

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
			colors: {},
		},
	},
})

const system = createSystem(defaultConfig, config)

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider value={system}>{children}</ChakraProvider>;
		</QueryClientProvider>
	)
}
