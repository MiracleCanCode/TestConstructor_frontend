import { CustomButton } from '@/components/ui'
import { CustomLoader } from '@/components/ui/custom-loader'
import { Fireworks } from '@/components/ui/fireworks'
import { Flex, Title } from '@mantine/core'
import { Container } from '@mantine/core'
import { FC } from 'react'

interface Props {
	points: number
	resetAnswers: () => void
	loading: boolean
}

export const ResultPage: FC<Props> = ({ points, loading, resetAnswers }) => {
	const fireworksProps = {
		numberOfParticles: 150,
		colors: ['#ff0000', '#00ff00', '#0000ff'],
		particleSize: 4,
		minSpeed: 2,
		maxSpeed: 6,
		gravity: 0.05,
		burstTimeout: 500,
		burstCount: 5,
		fadeOut: true
	}

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
			{points === 100 && (
				<Fireworks {...fireworksProps} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
			)}
		</Container>
	)
}
