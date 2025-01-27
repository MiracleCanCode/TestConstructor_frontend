import { create } from 'zustand'

import { Question, Test } from '@/components/helpers/interfaces/interface'
import { AxiosInstance } from '@/components/helpers/constants/instance'
import { ErrorNotification } from '@/components/ui'

interface IUseCreateTestStore {
	test: Test
	createTest: (test: Test, token: string) => void
	createQuestion: (question: Question) => void
}

export const useCreateTestStore = create<IUseCreateTestStore>(set => ({
	test: {
		name: '',
		questions: []
	},
	createTest: (testCreate: Test, token: string) => {
		set({ test: testCreate })
		if (token) {
			AxiosInstance.post('/test/create', testCreate)
				.then(res => set({ test: res.data }))
				.catch(() => {
					ErrorNotification()
					set({ test: { name: '', questions: [] } })
				})
		}
	},

	createQuestion: (question: Question) => {
		console.log(question)
		set(state => ({
			test: {
				...state.test,
				questions: [...state.test.questions, question]
			}
		}))
	}
}))
