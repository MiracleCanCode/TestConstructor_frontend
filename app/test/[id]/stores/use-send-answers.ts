import { AxiosInstance } from '@/components/helpers/constants/instance'
import { Test } from '@/components/helpers/interfaces/interface'
import { create } from 'zustand'

interface UseSendAnswers {
	success: number
	sendAnswers: (answers: Record<number, number>, test: Test) => void
}

export const useSendAnswers = create<UseSendAnswers>(set => ({
	success: 0,
	sendAnswers: (answers: Record<number, number>, test: Test) => {
		const updatedTest = {
			...test,
			questions: test.questions.map(question => {
				const selectedVariantId = answers[question.ID ?? 0]
				return {
					...question,
					variants: question.variants.map(variant => ({
						...variant,
						is_correct: variant.ID === selectedVariantId
					}))
				}
			})
		}

		AxiosInstance.post('/test/validate', {
			test: updatedTest
		})
			.then(res => set({ success: res.data.success }))
			.catch(error => console.error('Ошибка при отправке:', error))
	}
}))
