import { FC } from 'react'
import { Paper, PaperProps, Switch, Text } from '@mantine/core'

interface Props extends PaperProps {
    name: string
    index: number
    isCorrect?: boolean
    key?: number
    solve?: boolean
    setIsCorrect?: () => void
    checked?: boolean
    onClick?: () => void
}

export const VariantEntity: FC<Props> = ({
    name,
    index,
    isCorrect,
    key,
    solve = false,
    setIsCorrect,
    checked,
    onClick
}) => {
    return (
        <Paper
            key={key}
            shadow='xs'
            withBorder
            p='md'
            className={solve ? 'cursor-pointer' : checked ? ' outline-green-500' : ''}
            onClick={onClick}
        >
            <Text>Вариант {index}</Text>
            <Text size='xl'>{name}</Text>
            {!solve && (
                <Switch onChange={setIsCorrect} label='Правильный вариант' checked={isCorrect} disabled mt={10} />
            )}
        </Paper>
    )
}

VariantEntity.displayName = 'VariantEntity'
