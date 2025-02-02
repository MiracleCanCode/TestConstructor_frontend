import { CustomButton } from '@/components/ui'
import { VariantCard } from '@/components/ui/variant-card'
import { Container, Divider, Flex, Title } from '@mantine/core'
import { FC, useCallback, useState } from 'react'
import { useSendAnswers } from '../stores/use-send-answers'
import { useGetTestById } from '../stores/use-get-test-by-id'
import { ResultContentView } from './result-content-view'
import { CustomLoader } from '@/components/ui/custom-loader'

interface SelectedAnswers {
	[questionId: number]: number
}

export const UserContentView: FC = () => {
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({})
	const { test, loading } = useGetTestById()
	const { sendAnswers, points, loader } = useSendAnswers()
	const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)

	const handleVariantClick = useCallback((questionId: number, variantId: number) => {
		setSelectedAnswers(prev => ({
			...prev,
			[questionId]: variantId
		}))
	}, [])

	const completeTest = useCallback(() => {
		if (test) {
			sendAnswers(selectedAnswers, test)
		}
		setIsTestCompleted(true)
	}, [selectedAnswers, sendAnswers, test])

	const resetAnswers = useCallback(() => {
		setIsTestCompleted(false)
		setSelectedAnswers([])
	}, [])

	if (loading) return <CustomLoader />

	if (points && isTestCompleted) {
		return <ResultContentView loading={loader} points={Math.trunc(points)} resetAnswers={resetAnswers} />
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
									<VariantCard
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

UserContentView.displayName = 'UserContentViewComponent'
