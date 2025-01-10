import { FC } from 'react'
import { Paper, Switch, Text } from '@mantine/core'

export const Variant: FC<{ name: string; index: number; isCorrect: boolean; key?: number }> = ({
    name,
    index,
    isCorrect,
    key,
}) => {
    return (
        <Paper key={key} shadow='xs' withBorder p='md'>
            <Text>Вариант {index}</Text>
            <Text size='xl'>{name}</Text>
            <Switch label='Правильный вариант' checked={isCorrect} disabled mt={10} />
        </Paper>
    )
}

Variant.displayName = 'VariantEntity'
