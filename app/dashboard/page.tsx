'use client'
import { useTestManager } from '@/components/stores/use-test-manager'
import { useUserStore } from '@/components/stores/use-user-store'
import { CustomButton } from '@/components/ui'
import { TestEntity } from './components/test-entity'
import { Flex, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { CustomLoader } from '@/components/ui/custom-loader'
import { useGetToken } from '@/components/hooks/use-get-token'

const Dashboard: FC = () => {
	const { getTests, tests, loading } = useTestManager()
	const { user } = useUserStore()
	const { token } = useGetToken()

	useEffect(() => {
		getTests(user.id || 0, 0, 5, token || '')
	}, [getTests, token, user.id])

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
						<Link href='/create_test'>
							<CustomButton variant='subtle' size='xl'>
								Создайте свой первый тест!
							</CustomButton>
						</Link>
					</Title>
				</Flex>
			)}
		</Flex>
	)
}

Dashboard.displayName = 'DashboardPage'
export default Dashboard
