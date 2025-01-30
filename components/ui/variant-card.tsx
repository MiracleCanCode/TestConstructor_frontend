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

export const VariantCard: FC<Props> = ({
	name,
	index,
	isCorrect,
	key,
	solve = false,
	setIsCorrect,
	onClick,
	classNames,
	...props
}) => {
	return (
		<Paper
			style={props.style}
			classNames={classNames}
			key={key}
			shadow='xs'
			withBorder
			p='md'
			className={props.className}
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

VariantCard.displayName = 'VariantCardComponent'
