import { FC, memo, useCallback, useMemo, useState } from 'react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { useTestManager } from '@/components/stores/use-test-manager'
import { useViewportSize } from '@mantine/hooks'
import { TestView } from './test-view'
import { TestCardProps } from './helpers/interface'

export const TestCard: FC<TestCardProps> = memo(({ name, description, id, active }) => {
	const { width } = useViewportSize()
	const { deleteTest, changeActive } = useTestManager()
	const [isActive, setIsActive] = useState<boolean>(active)
	const icon = useMemo(() => (isActive ? <CiPause1 /> : <CiPlay1 />), [isActive])
	const label = useMemo(
		() => (isActive ? 'Тест будет доступен только вам' : 'Тест будет доступен всем по прямой ссылки'),
		[isActive]
	)
	const actionName = useMemo(() => (isActive ? 'Выключить' : 'Включить'), [isActive])
	const activeBadgeText = useMemo(() => (isActive ? 'Активен' : 'Не активен'), [isActive])
	const testURL = useMemo(() => window.location.host + `/test/${id}`, [id])

	const DeleteTestAction = useCallback(() => {
		deleteTest(id)
	}, [deleteTest])

	const ChangeActiveAction = useCallback(() => {
		setIsActive(!isActive)
		changeActive(id, !isActive)
	}, [changeActive, id, isActive])
	return (
		<TestView
			name={name}
			description={description}
			isMobile={width <= 1200}
			testURL={testURL}
			label={label}
			icon={icon}
			actionName={actionName}
			ChangeActiveAction={ChangeActiveAction}
			DeleteTestAction={DeleteTestAction}
			isActive={isActive}
			id={id}
			activeBadgeText={activeBadgeText}
		/>
	)
})

TestCard.displayName = 'TestCardComponent'
