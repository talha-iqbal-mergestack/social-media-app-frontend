import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'
import * as React from 'react'

export interface TooltipProps extends ChakraTooltip.RootProps {
	showArrow?: boolean
	portalled?: boolean
	portalRef?: React.RefObject<HTMLElement>
	content: React.ReactNode
	contentProps?: ChakraTooltip.ContentProps
	disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
	function Tooltip(props, ref) {
		const {
			showArrow,
			children,
			disabled,
			portalled = true,
			content,
			contentProps,
			portalRef,
			...rest
		} = props

		if (disabled) return children

		return (
			<ChakraTooltip.Root {...rest}>
				<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
				<Portal disabled={!portalled} container={portalRef}>
					<ChakraTooltip.Positioner>
						<ChakraTooltip.Content
							ref={ref}
							bg="white"
							color="gray.800"
							p={2}
							borderRadius="md"
							border="1px solid"
							borderColor="gray.200"
							boxShadow="sm"
							whiteSpace="pre-line"
							{...contentProps}
						>
							{showArrow && (
								<ChakraTooltip.Arrow>
									<ChakraTooltip.ArrowTip bg="white" borderColor="gray.200" />
								</ChakraTooltip.Arrow>
							)}
							{content}
						</ChakraTooltip.Content>
					</ChakraTooltip.Positioner>
				</Portal>
			</ChakraTooltip.Root>
		)
	}
)
