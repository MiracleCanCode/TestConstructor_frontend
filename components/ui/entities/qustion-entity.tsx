import { Variant } from '@/components/stores/use-create-test-store'
import { Paper, Text } from '@mantine/core'
import { FC } from 'react'
import { VariantEntity } from './variant-entity'

interface Props {
    name: string
    description?: string
    variants: Variant[]
    questionIndex: number
}

export const QuestionEntity: FC<Props> = ({ name, description, variants, questionIndex }) => (
    <Paper shadow='xs' withBorder p='md'>
        <Text>
            Вопрос {questionIndex}. {name}
        </Text>
        <Text>{description}</Text>
        {variants.length > 0 &&
            variants.map((v, idx) => (
                <div key={idx} className=' mb-3 mt-2'>
                    <VariantEntity key={idx} index={idx + 1} name={v.name} isCorrect={v.isCorrect} />
                </div>
            ))}
    </Paper>
)

QuestionEntity.displayName = 'QuestionEntity'
