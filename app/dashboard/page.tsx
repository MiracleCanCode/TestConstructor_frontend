'use client'
import { useTestManager } from '@/components/stores/use-test-manager'
import { useUserStore } from '@/components/stores/use-user-store'
import { CustomLoader } from '@/components/ui/custom-loader'
import { TestEntity } from '@/components/ui/entities/test-entity'
import { Flex, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { FC, useEffect } from 'react'

const Dashboard: FC = () => {
    const { getTests, tests, loading } = useTestManager()
    const { user } = useUserStore()

    useEffect(() => {
        getTests(user.id || 0, 0, 5)
    }, [getTests, user.id])

    if (loading) {
        return <CustomLoader />
    }
    return (
        <Flex className=' mt-7'>
            {tests.length > 0 ? (
                <div>
                    <Text size='xl'>Ваши тесты:</Text>
                    <Flex mt={20} gap={20} wrap='wrap'>
                        {tests.map(test => (
                            <div key={test.ID}>
                                <TestEntity
                                    active={test.is_active ?? true}
                                    name={test.name}
                                    description={test.description}
                                    id={test.ID || 1}
                                />
                            </div>
                        ))}
                    </Flex>
                </div>
            ) : (
                <Flex align='center' justify='center' h='80vh' w='100%'>
                    <Title size='xl'>
                        У вас нет тестов. <Link href='/create_test'>Создайте</Link>
                    </Title>
                </Flex>
            )}
        </Flex>
    )
}

Dashboard.displayName = 'DashboardPage'
export default Dashboard
