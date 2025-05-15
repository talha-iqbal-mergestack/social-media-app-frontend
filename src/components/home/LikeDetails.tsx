'use client'

import { VStack, HStack, Text, Popover } from '@chakra-ui/react'

import { AvatarComponent } from '@/components/ui/avatar'
import { User } from '@/types'

type LikeDetailsProps = {
	likes: User[]
}

export const LikeDetails = ({ likes }: LikeDetailsProps) => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Text fontSize="sm" color="gray.500" cursor="pointer">
					{likes.length} likes
				</Text>
			</Popover.Trigger>
			{/* <Popover.Backdrop /> */}
			<Popover.Positioner>
				<Popover.Content>
					<Popover.CloseTrigger position="absolute" top={3} right={4} />
					<Popover.Header>
						<Popover.Title>Liked by</Popover.Title>
					</Popover.Header>
					<Popover.Body>
						<VStack align="stretch" gap={4}>
							{likes.map(user => (
								<HStack key={user.id} gap={3}>
									<AvatarComponent name={user.name} avatar={user.avatar} />
									<Text fontWeight="medium">{user.name}</Text>
								</HStack>
							))}
						</VStack>
					</Popover.Body>
				</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	)
}
