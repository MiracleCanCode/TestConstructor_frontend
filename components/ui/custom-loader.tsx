import { Flex, Loader } from '@mantine/core'
import { FC } from 'react'

export const CustomLoader: FC = () => (
    <Flex align='center' justify='center' h='80vh'>
        <Loader color='blue' size='xl' />
    </Flex>
)

CustomLoader.displayName = 'CustomLoader'
