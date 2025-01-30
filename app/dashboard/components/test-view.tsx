import { CustomButton, CustomTooltip } from '@/components/ui'
import { DeleteButton } from '@/components/ui/delete-button'
import { ActionIcon, CopyButton, Tooltip, Text, Card, Group, Badge } from '@mantine/core'
import Link from 'next/link'
import { FC, JSX } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { TestCardProps } from './helpers/interface'

interface Actions {
	DeleteTestAction: () => void
	ChangeActiveAction: () => void
}

interface Props extends Omit<TestCardProps, 'active'>, Actions {
	label: string
	icon: JSX.Element
	isActive: boolean
	actionName: string
	testURL: string
	isMobile: boolean
	activeBadgeText: string
}

export const TestView: FC<Props> = ({
	name,
	DeleteTestAction,
	ChangeActiveAction,
	actionName,
	testURL,
	description,
	id,
	icon,
	label,
	isActive,
	isMobile,
	activeBadgeText
}) => (
	<Card padding='xs' w={isMobile ? '100%' : 400} withBorder shadow='sm' radius='md'>
		<Group>
			<Link href={`/test/${id}`}>
				<Text fw={500} size='xl'>
					{name}
				</Text>
			</Link>
			<Badge variant={isActive ? '' : 'outline'} w={110}>
				{activeBadgeText}
			</Badge>
		</Group>

		<Text size='sm' c='dimmed'>
			{description}
		</Text>

		<Group mt='md' mb='xs'>
			<CustomTooltip label={label} position='bottom'>
				<CustomButton
					w={140}
					leftSection={icon}
					onClick={ChangeActiveAction}
					size='compact-sm'
					variant='outline'
				>
					{actionName}
				</CustomButton>
			</CustomTooltip>
			<CustomTooltip label='Удалить тест без возможности восстановления' position='bottom'>
				<DeleteButton size='compact-sm' variant='outline' color='red' onClick={DeleteTestAction}>
					Удалить
				</DeleteButton>
			</CustomTooltip>
			<CopyButton value={testURL} timeout={2000}>
				{({ copied, copy }) => (
					<Tooltip
						label={
							copied
								? 'Скопировано!'
								: isActive
									? 'Скопировать ссылку на тест'
									: 'Ссылку на тест нельзя скопировать так как тест не активен'
						}
						withArrow
						position='right'
					>
						<ActionIcon
							disabled={!isActive}
							color={copied ? 'teal' : 'gray'}
							variant='subtle'
							onClick={copy}
						>
							{copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
						</ActionIcon>
					</Tooltip>
				)}
			</CopyButton>
		</Group>
	</Card>
)

TestView.displayName = 'TestViewComponent'
