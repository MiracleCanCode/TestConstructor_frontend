import { Flex, Loader } from '@mantine/core'
import { FC } from 'react'

export const CustomLoader: FC = () => (
	<Flex align='center' justify='center' h='80vh'>
		<Loader color='rgba(255, 255, 255, 1)' type='bars' size={40} />
	</Flex>
)

CustomLoader.displayName = 'CustomLoader'
