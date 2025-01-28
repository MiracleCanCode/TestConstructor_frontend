import { Test } from '@/components/helpers/interfaces/interface'
import { useTestManager } from '@/components/stores/use-test-manager'
import { CustomButton } from '@/components/ui'
import { DeleteButton } from '@/components/ui/delete-button'
import { Badge, ButtonVariant, Container, Flex, Title } from '@mantine/core'
import { FC } from 'react'

const Button: FC<{ children: string; variant?: ButtonVariant; onClick?: () => void }> = ({
	children,
	variant,
	onClick
}) => (
	<CustomButton size='compact-sm' variant={variant} onClick={onClick}>
		{children}
	</CustomButton>
)

export const ForCreator: FC<{ test: Test }> = ({ test }) => {
	const { deleteTest, changeActive } = useTestManager()
	const activeStatusBadgeText = test.is_active ? 'Активен' : 'Не активен'
	const activeStatusBadgeVariant = test.is_active ? 'filled' : 'outline'
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
					<Button variant='outline' onClick={() => changeActive(test.ID || 0, test.is_active || false)}>
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
