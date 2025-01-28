import { CustomButton } from '@/components/ui'
import { VariantEntity } from '@/components/ui/variant-entity'
import { Container, Divider, Flex, Title } from '@mantine/core'
import { TestSkeleton } from './test-skeleton'
import { useState } from 'react'
import { useSendAnswers } from '../stores/use-send-answers'
import { useGetTestById } from '../stores/use-get-test-by-id'
import { ResultPage } from './result-page'

interface SelectedAnswers {
	[questionId: number]: number
}

export const ForUsers = () => {
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
	const { test, loading } = useGetTestById()
	const { sendAnswers, points, loader } = useSendAnswers()
	const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)

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

	if (points && isTestCompleted) {
		const result = Math.trunc(points)

		return <ResultPage loading={loader} points={result} resetAnswers={resetAnswers} />
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
