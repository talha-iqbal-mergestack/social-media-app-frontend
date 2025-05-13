import { Button, Text, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface ResendOTPProps {
	onResend: () => void
	isLoading: boolean
}

export const ResendOTP = ({ onResend, isLoading }: ResendOTPProps) => {
	const [countdown, setCountdown] = useState(60)
	const [canResend, setCanResend] = useState(false)

	useEffect(() => {
		if (!canResend && countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
			return () => clearTimeout(timer)
		}
		if (countdown === 0) {
			setCanResend(true)
		}
	}, [countdown, canResend])

	useEffect(() => {
		if (!isLoading) {
			setCanResend(false)
			setCountdown(60)
		}
	}, [isLoading])

	const handleResend = () => {
		onResend()
	}

	return (
		<HStack gap={2} justify="center" width="100%">
			{!canResend && !isLoading ? (
				<Text fontSize="sm" color="gray.500">
					Resend code in {countdown}s
				</Text>
			) : (
				<Button
					type="button"
					colorScheme="blue"
					onClick={handleResend}
					loading={isLoading}
				>
					Resend verification code
				</Button>
			)}
		</HStack>
	)
}
