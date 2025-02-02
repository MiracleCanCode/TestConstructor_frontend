import { CustomButton } from '@/components/ui'
import { CustomLoader } from '@/components/ui/custom-loader'
import { Flex, Title } from '@mantine/core'
import { Container } from '@mantine/core'
import { FC } from 'react'

interface Props {
	points: number
	resetAnswers: () => void
	loading: boolean
}

export const ResultContentView: FC<Props> = ({ points, loading, resetAnswers }) => {
	if (loading) {
		return <CustomLoader />
	}

	return (
		<Container>
			<Flex align='center' mt='60px'>
				<Title>Ваш результат: {points} баллов из 100</Title>
			</Flex>
			<CustomButton mt={20} onClick={resetAnswers}>
				Пройти тест еще раз
			</CustomButton>
		</Container>
	)
}

ResultContentView.displayName = 'ResultContentViewComponent'
