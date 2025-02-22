'use client'
import { useTestManager } from '@/components/stores/use-test-manager'
import { useUserStore } from '@/components/stores/use-user-store'
import { CustomButton } from '@/components/ui'
import { TestCard } from './components/test-card'
import { Flex, Group, Select } from '@mantine/core'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { CustomLoader } from '@/components/ui/custom-loader'
import { CustomTitle } from '@/components/ui/custom-title'
import { useViewportSize } from '@mantine/hooks'

const sortData = [
	{
		value: 'active',
		label: 'Показать только активные тесты'
	},
	{
		value: 'notActive',
		label: 'Показать только не активные тесты'
	},
	{
		value: '',
		label: 'Не сортировать'
	}
]

const Dashboard: FC = () => {
	const { getTests, tests, loading, sortTests, count, originalTests } = useTestManager()
	const [value, setValue] = useState<string | null>('')

	const { user } = useUserStore()
	const { width } = useViewportSize()

	const paddingSize = useMemo(() => (width <= 992 ? 0 : 50), [width])
	const titleSize = useMemo(() => (width <= 992 ? 3 : 1), [width])

	useEffect(() => {
		if (user?.id) {
			getTests(user.id, 0, 5)
		}
	}, [getTests, user?.id])

	useEffect(() => {
		sortTests(value || '')
	}, [sortTests, value])

	if (loading || !originalTests) return <CustomLoader />
	if (count < 1 || !originalTests) {
		return (
			<Flex align='center' justify='center' h='80vh' w='100%'>
				<CustomTitle size='xl'>
					<Link href='/create_test'>
						<CustomButton variant='subtle' size='xl'>
							Создайте свой первый тест!
						</CustomButton>
					</Link>
				</CustomTitle>
			</Flex>
		)
	}

	return (
		<Flex className=' mt-7' direction='column' p={paddingSize}>
			<Group justify='space-between' w='100%'>
				<CustomTitle mb={20} order={titleSize}>
					Ваши тесты:
				</CustomTitle>
				<Select placeholder='Сортировать' value={value} onChange={setValue} data={sortData} variant='default' />
			</Group>
			<div>
				<Flex mt={20} gap={20} wrap='wrap'>
					{tests.map(test => (
						<div key={test.ID}>
							<TestCard
								active={test.is_active ?? true}
								name={test.name}
								description={test.description}
								id={test.ID || 1}
							/>
						</div>
					))}
				</Flex>
			</div>
		</Flex>
	)
}

Dashboard.displayName = 'DashboardPage'
export default Dashboard
