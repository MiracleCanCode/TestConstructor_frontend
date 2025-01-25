import { ActionIcon, CopyButton, Flex, Paper, Text, Tooltip } from '@mantine/core'
import Link from 'next/link'
import { FC, JSX, useMemo, useState } from 'react'
import { CustomButton } from '../../../components/ui/custom-button'
import { DeleteButton } from '../../../components/ui/delete-button'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { CustomTooltip } from '../../../components/ui/custom-tooltip'
import { useViewportSize } from '@mantine/hooks'
import { useTestManager } from '@/components/stores/use-test-manager'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface Props {
	name: string
	description?: string
	id: number
	active: boolean
}

interface IRenderTestEntity extends Omit<Props, 'active'> {
	label: string
	icon: JSX.Element
	isActive: boolean
	DeleteTestAction: () => void
	ChangeActiveAction: () => void
	actionName: string
	testURL: string
	width: number
}

const RenderTestEntity: FC<IRenderTestEntity> = ({
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
	width
}) => (
	<Paper shadow='xs' withBorder p='md' w={width <= 552 ? '100%' : 500}>
		<Link href={`/test/${id}`}>
			<Text>{name}</Text>
		</Link>
		<Text>{description}</Text>
		<Flex mt={20} gap={10}>
			<CustomTooltip label={label} position='bottom'>
				<CustomButton leftSection={icon} onClick={ChangeActiveAction} size='compact-sm' variant='outline'>
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
		</Flex>
	</Paper>
)

export const TestEntity: FC<Props> = ({ name, description, id, active }) => {
	const { width } = useViewportSize()
	const { deleteTest, changeActive } = useTestManager()
	const [isActive, setIsActive] = useState<boolean>(active)
	const icon = useMemo(() => (isActive ? <CiPause1 /> : <CiPlay1 />), [isActive])
	const label = useMemo(
		() => (isActive ? 'Тест будет доступен только вам' : 'Тест будет доступен всем по прямой ссылки'),
		[isActive]
	)
	const actionName = useMemo(() => (isActive ? 'Выключить' : 'Включить'), [isActive])
	const testURL = window.location.host + `/test/${id}`

	const DeleteTestAction = () => {
		deleteTest(id)
	}

	const ChangeActiveAction = () => {
		setIsActive(!isActive)
		changeActive(id, !isActive)
	}
	return (
		<RenderTestEntity
			name={name}
			description={description}
			width={width}
			testURL={testURL}
			label={label}
			icon={icon}
			actionName={actionName}
			ChangeActiveAction={ChangeActiveAction}
			DeleteTestAction={DeleteTestAction}
			isActive={isActive}
			id={id}
		/>
	)
}
