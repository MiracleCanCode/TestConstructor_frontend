import { useUserStore } from '@/components/stores/use-user-store'
import { Avatar, Flex } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

export const IsAuthContent: FC = () => {
	const { user } = useUserStore()

	return (
		<Flex justify='flex-end'>
			<Link href={`/profile`}>
				<Avatar name={user.login} />
			</Link>
		</Flex>
	)
}

IsAuthContent.displayName = 'IsAuthContentComponent'
