import { ActionIcon, CopyButton, Flex, Paper, Text, Tooltip } from '@mantine/core'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { CustomButton } from '../custom-button'
import { DeleteButton } from '../delete-button'
import { FaPause, FaPlay } from 'react-icons/fa'
import { CustomTooltip } from '../custom-tooltip'
import { useViewportSize } from '@mantine/hooks'
import { useTestManager } from '@/components/stores/use-test-manager'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface Props {
    name: string
    description?: string
    id: number
    active: boolean
}

export const TestEntity: FC<Props> = ({ name, description, id, active }) => {
    const { width } = useViewportSize()
    const { deleteTest, changeActive } = useTestManager()
    const [isActive, setIsActive] = useState<boolean>(active)
    const icon = useMemo(() => (isActive ? <FaPause /> : <FaPlay />), [isActive])
    const label = useMemo(
        () => (isActive ? 'Тест будет доступен только вам' : 'Тест будет доступен всем по прямой ссылки'),
        [isActive],
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
        <Paper shadow='xs' withBorder p='md' w={width <= 992 ? '100%' : 500}>
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
}
