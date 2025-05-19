'use client'

import { Box, Grid, IconButton, Popover, Portal } from '@chakra-ui/react'
import { BsEmojiSmile } from 'react-icons/bs'

type EmojiPickerProps = {
	registerName?: string
}

const EMOJI_LIST = [
	'😊',
	'😂',
	'🥰',
	'😍',
	'🤔',
	'😅',
	'👍',
	'❤️',
	'🎉',
	'✨',
	'🔥',
	'💯',
]

export const EmojiPicker = ({ registerName = 'text' }: EmojiPickerProps) => {
	const handleEmojiSelect = (emoji: string) => {
		const input = document.querySelector(
			`input[name="${registerName}"]`
		) as HTMLInputElement
		if (input) {
			const start = input.selectionStart as number
			const end = input.selectionEnd as number
			const text = input.value
			const newText = text.substring(0, start) + emoji + text.substring(end)
			input.value = newText
			input.selectionStart = input.selectionEnd = start + emoji.length
			input.focus()
		}
	}
	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton
					aria-label="Add emoji"
					size="sm"
					variant="ghost"
					_hover={{ color: 'primary' }}
				>
					<BsEmojiSmile />
				</IconButton>
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content>
						<Popover.Body>
							<Box p={2}>
								<Grid templateColumns="repeat(6, 1fr)" gap={2}>
									{EMOJI_LIST.map((emoji, index) => (
										<IconButton
											key={index}
											size="sm"
											variant="ghost"
											onClick={() => handleEmojiSelect(emoji)}
										>
											{emoji}
										</IconButton>
									))}
								</Grid>
							</Box>
						</Popover.Body>
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover.Root>
	)
}
