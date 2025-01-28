import { AxiosInstance } from '@/components/helpers/constants/instance'
import { Test } from '@/components/helpers/interfaces/interface'
import { create } from 'zustand'
import { Notification } from '@/components/ui'

interface State {
	points: number
	loader: boolean
}

interface Actions {
	sendAnswers: (answers: Record<number, number>, test: Test) => void
}

export const useSendAnswers = create<State & Actions>(set => ({
	points: 0,
	loader: false,
	sendAnswers: async (answers, test) => {
		set({ loader: true })
		try {
			const testWithAnswers = {
				...test,
				questions: test.questions
					.filter(question => question.ID !== undefined)
					.map(question => {
						const userAnswerId = answers[question.ID!]
						return {
							...question,
							variants: question.variants.map(variant => ({
								...variant,
								is_correct: variant.ID === userAnswerId
							}))
						}
					})
			}

			const res = await AxiosInstance.post('/test/validate', { test: testWithAnswers })
			set({ points: res.data.success })
		} catch (error) {
			if (error instanceof Error) {
				const errorMessage = error.message
				Notification(errorMessage, 'red')
			} else {
				Notification('Неизвестная ошибка.', 'red')
			}
			set({ loader: false })
		} finally {
			set({ loader: false })
		}
	}
}))
