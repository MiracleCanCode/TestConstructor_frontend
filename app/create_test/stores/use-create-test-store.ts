import { create } from 'zustand'

import { Question, Test } from '@/components/helpers/interfaces/interface'
import { AxiosInstance } from '@/components/helpers/constants/instance'
import { Notification } from '@/components/ui/notification'
import { errorMessage } from '@/components/helpers/error-message'

interface State {
	createTestError: string
	test: Test
}

interface Actions {
	createTest: (test: Test, token: string) => void
	createQuestion: (question: Question) => void
	clearTest: () => void
	clearError: () => void
}

export const useCreateTestStore = create<State & Actions>(set => ({
	createTestError: '',
	test: {
		name: '',
		questions: []
	},
	createTest: (testCreate: Test, token: string) => {
		if (!token) {
			set({ createTestError: 'Токен отсутствует. Тест не будет сохранен.' })
			Notification('Токен отсутствует. Тест не будет сохранен.', 'red')
			return
		}

		AxiosInstance.post('/test/create', testCreate)
			.then(res => {
				set({ test: res.data, createTestError: '' })
				Notification('Тест успешно создан!', 'green')
			})
			.catch(error => {
				set({ test: { name: '', questions: [] }, createTestError: errorMessage(error) })
				Notification(errorMessage(error), 'red')
			})
	},
	createQuestion: (question: Question) => {
		set(state => ({
			test: {
				...state.test,
				questions: [...state.test.questions, question]
			}
		}))
	},
	clearTest: () => set(() => ({ test: { name: '', questions: [] } })),
	clearError: () => set({ createTestError: '' })
}))
