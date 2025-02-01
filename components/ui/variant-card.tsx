import { FC } from 'react'
import { Checkbox, CheckboxCardProps, Group, Text } from '@mantine/core'

interface Props extends CheckboxCardProps {
	name: string
	index: number
	isCorrect?: boolean
	solve?: boolean
	setIsCorrect?: () => void
	checked?: boolean
	onClick?: () => void
}

export const VariantCard: FC<Props> = ({
	name,
	index,
	isCorrect,
	solve = false,
	setIsCorrect,
	onClick,
	classNames,
	...props
}) => {
	return (
		<Checkbox.Card
			p={10}
			radius='md'
			checked={isCorrect}
			onClick={onClick}
			onChange={setIsCorrect}
			className={props.className}
			classNames={classNames}
			disabled={!solve}
		>
			<Group>
				<Checkbox.Indicator />
				<div>
					<Text>Вариант {index}</Text>
					<Text size='xl'>{name}</Text>
				</div>
			</Group>
		</Checkbox.Card>
	)
}

VariantCard.displayName = 'VariantCardComponent'
