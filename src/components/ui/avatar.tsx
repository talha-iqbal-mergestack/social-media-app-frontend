import { Avatar } from '@chakra-ui/react'

interface AvatarComponentProps {
	name: string
	avatar?: string
	onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function AvatarComponent({
	name,
	avatar,
	onClick,
}: AvatarComponentProps) {
	return (
		<Avatar.Root variant="subtle" onClick={onClick}>
			<Avatar.Fallback name={name} />
			<Avatar.Image src={avatar} />
		</Avatar.Root>
	)
}
