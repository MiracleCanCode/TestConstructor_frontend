import { Paper, Text } from '@mantine/core'
import { FC } from 'react'
import { VariantCard } from '@/components/ui/variant-card'
import { Variant } from '@/components/helpers/interfaces/interface'
import { DeleteButton } from '@/components/ui/delete-button'

interface Props {
	name: string
	description?: string
	variants: Variant[]
	questionIndex: number
	forSolve?: boolean
	deleteAction: () => void
}

export const QuestionCard: FC<Props> = ({ name, description, variants, questionIndex, forSolve, deleteAction }) => (
	<Paper shadow='xs' withBorder p='md'>
		<Text>
			Вопрос {questionIndex}. {name}
		</Text>
		<Text>{description}</Text>
		{variants.length > 0 &&
			variants.map((v, idx) => (
				<div key={idx} className=' mb-3 mt-2'>
					<VariantCard index={idx + 1} name={v.name} isCorrect={v.is_correct} solve={forSolve} />
				</div>
			))}
		<DeleteButton variant='subtle' onClick={deleteAction}>
			Удалить вопрос
		</DeleteButton>
	</Paper>
)

QuestionCard.displayName = 'QuestionCardComponent'
