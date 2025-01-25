'use client'

import { useGetTestById } from './stores/use-get-test-by-id'
import { CustomButton } from '@/components/ui'

import { VariantEntity } from '@/components/ui/variant-entity'
import { Container, Flex, Title, Divider } from '@mantine/core'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { TestSkeleton } from './components/test-skeleton'
import { useSendAnswers } from './stores/use-send-answers'
import '@mantine/charts/styles.css'
import { Fireworks } from '@/components/ui/fireworks'

interface SelectedAnswers {
	[questionId: number]: number
}

const TestPage: FC = () => {
	const { getTestById, test, loading } = useGetTestById()
	const { id } = useParams()
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
	const { sendAnswers, success } = useSendAnswers()
	const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)

	useEffect(() => {
		getTestById(Number(id))
	}, [id])

	const handleVariantClick = (questionId: number, variantId: number) => {
		setSelectedAnswers(prev => ({
			...prev,
			[questionId]: variantId
		}))
	}

	const completeTest = () => {
		if (test) {
			sendAnswers(selectedAnswers, test)
		} else {
			console.error('Test data is not loaded.')
		}
		setIsTestCompleted(true)
	}

	if (loading) {
		return <TestSkeleton />
	}

	const resetAnswers = () => {
		setIsTestCompleted(false)
		setSelectedAnswers([])
	}

	if (success && isTestCompleted) {
		const result = Math.trunc(success)

		return (
			<Container>
				<Flex align='center' mt='60px'>
					<Title>Ваш результат: {result + ' баллов'} из 100</Title>
				</Flex>
				<CustomButton mt={20} onClick={resetAnswers}>
					Пройти тест еще раз
				</CustomButton>
				{success === 100 && (
					<Fireworks
						numberOfParticles={150}
						colors={['#ff0000', '#00ff00', '#0000ff']}
						particleSize={4}
						minSpeed={2}
						maxSpeed={6}
						gravity={0.05}
						burstTimeout={500}
						burstCount={3}
						fadeOut={true}
					/>
				)}
			</Container>
		)
	}

	return (
		<Container>
			<Flex align='center' mt='60px'>
				<Title>{test?.name}</Title>
			</Flex>
			<div className=' mt-8'>
				{test.questions?.map(question => (
					<div key={question.ID} className=' mb-6'>
						<Divider label={question.name} mb={20} />

						{question.variants?.map((variant, variantIdx) => {
							const isSelected = selectedAnswers[question.ID || 0] === variant.ID || 0
							return (
								<div key={variantIdx} className=' mb-3'>
									<VariantEntity
										style={{
											cursor: 'pointer',
											borderColor: isSelected ? '#38a169' : undefined,
											transition: 'all 0.3s ease'
										}}
										onClick={() => handleVariantClick(question.ID ?? 0, variant.ID ?? 0)}
										name={variant.name}
										index={variantIdx + 1}
										solve
									/>
								</div>
							)
						})}
					</div>
				))}
			</div>
			<CustomButton disabled={!selectedAnswers} variant='outline' mb={20} onClick={completeTest}>
				Завершить и получить результат
			</CustomButton>
		</Container>
	)
}

TestPage.displayName = 'TestPage'
export default TestPage
