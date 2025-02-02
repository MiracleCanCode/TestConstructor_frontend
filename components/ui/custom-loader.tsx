import { Flex, Loader } from '@mantine/core'
import { FC } from 'react'

export const CustomLoader: FC = () => (
	<Flex align='center' justify='center' h='80vh'>
		<Loader type='bars' size={40} />
	</Flex>
)

CustomLoader.displayName = 'CustomLoader'
