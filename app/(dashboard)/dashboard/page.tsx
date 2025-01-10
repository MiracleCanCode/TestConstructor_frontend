import { CustomButton } from '@/components/ui'
import { Flex } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'

const Dashboard: FC = () => {
    return (
        <Flex align='center' justify='center' h='80vh'>
            <Link href='/create_test'>
                <CustomButton>
                    <FaPlus className=' mr-2' />
                    Создать тест
                </CustomButton>
            </Link>
        </Flex>
    )
}

Dashboard.displayName = 'DashboardPage'
export default Dashboard
