'use client'

import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai'

type TextStyle = {
	fontWeight: string
	fontStyle: string
}

type TextStyleControlsProps = {
	textStyle: TextStyle
	setTextStyle: (style: TextStyle) => void
}

export const TextStyleControls = ({
	textStyle,
	setTextStyle,
}: TextStyleControlsProps) => {
	const handleFontWeightChange = () => {
		if (textStyle.fontWeight !== 'bold') {
			setTextStyle({ ...textStyle, fontWeight: 'bold' })
		} else {
			setTextStyle({ ...textStyle, fontWeight: '' })
		}
	}

	const handleFontStyleChange = () => {
		if (textStyle.fontStyle !== 'italic') {
			setTextStyle({ ...textStyle, fontStyle: 'italic' })
		} else {
			setTextStyle({ ...textStyle, fontStyle: '' })
		}
	}

	return (
		<ButtonGroup size="sm" variant="ghost">
			<IconButton
				aria-label="Bold"
				_hover={{ color: 'primary' }}
				onClick={handleFontWeightChange}
			>
				<AiOutlineBold />
			</IconButton>
			<IconButton
				aria-label="Italic"
				_hover={{ color: 'primary' }}
				onClick={handleFontStyleChange}
			>
				<AiOutlineItalic />
			</IconButton>
		</ButtonGroup>
	)
}
