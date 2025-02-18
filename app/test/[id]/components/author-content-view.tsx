import { Test } from '@/components/helpers/interfaces/interface'
import { useTestManager } from '@/components/stores/use-test-manager'
import { DeleteButton } from '@/components/ui/delete-button'
import { Badge, Container, Flex, Title } from '@mantine/core'
import { FC, useCallback, useMemo, useState } from 'react'
import { Button } from './button'

export const AuthorContentView: FC<{ test: Test }> = ({ test }) => {
	const { deleteTest, changeActive } = useTestManager()
	const [isActive, setIsActive] = useState<boolean>(test.is_active ?? false)
	const activeStatusBadgeText = useMemo(() => (isActive ? 'Активен' : 'Не активен'), [isActive])
	const activeStatusBadgeVariant = useMemo(() => (isActive ? 'filled' : 'outline'), [isActive])

	const changeTestActive = useCallback(() => {
		changeActive(test.ID!, !isActive || false)
		setIsActive(!isActive)
	}, [changeActive, isActive, test.ID])
	return (
		<Container>
			<Flex direction='column' justify='center' h='80vh' wrap='wrap'>
				<Flex>
					<Title>{test.name}</Title>
				</Flex>
				<Flex mt={20} gap={10} wrap='wrap'>
					<Badge variant={activeStatusBadgeVariant}>{activeStatusBadgeText}</Badge>
					<Badge variant='outline'>Количество людей прошедших тест {test.count_user_past}</Badge>
				</Flex>
				<Flex mt={10} gap={10} wrap='wrap'>
					<Button>Изменить тест</Button>
					<Button variant='outline' onClick={changeTestActive}>
						Изменить видимость теста
					</Button>
					<DeleteButton onClick={() => deleteTest(test.ID || 0)} size='compact-sm' variant='outline'>
						Удалить тест
					</DeleteButton>
				</Flex>
			</Flex>
		</Container>
	)
}

AuthorContentView.displayName = 'AuthorContentViewComponent'
