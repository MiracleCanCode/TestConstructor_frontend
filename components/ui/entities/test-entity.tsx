import { Flex, Paper, Text } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { CustomButton } from '../custom-button'
import { DeleteButton } from '../delete-button'
import { FaPause } from 'react-icons/fa'

interface Props {
    name: string
    description?: string
    id: number
}

export const TestEntity: FC<Props> = ({ name, description, id }) => (
    <Paper shadow='xs' withBorder p='md' w={500}>
        <Link href={`/test/${id}`}>
            <Text>{name}</Text>
        </Link>
        <Text>{description}</Text>
        <Flex mt={20} gap={10}>
            <CustomButton leftSection={<FaPause />} size='compact-sm' variant='outline'>
                Выключить
            </CustomButton>
            <DeleteButton size='compact-sm' variant='outline' color='red'>
                Удалить
            </DeleteButton>
        </Flex>
    </Paper>
)
