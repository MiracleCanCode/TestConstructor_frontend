import { create } from 'zustand'

import { AxiosInstance } from '../helpers/constants/instance'
import { Notification } from '../ui'
import { Test } from '../helpers/interfaces/interface'

interface State {
	tests: Test[]
	loading: boolean
}

interface Actions {
	getTests: (user_id: number, offset?: number, limit?: number, token?: string) => void
	deleteTest: (test_id: number) => void
	changeActive: (test_id: number, is_active: boolean) => void
}

export const useTestManager = create<State & Actions>(set => ({
	tests: [],
	loading: true,
	getTests: (user_id: number, offset?: number, limit?: number, token?: string) => {
		if (token && user_id !== 0) {
			AxiosInstance.post('/test/getAll', {
				offset: offset,
				limit: limit,
				user_id: user_id
			})
				.then(res => set({ tests: res.data.tests, loading: false }))
				.catch(error => {
					const errorMessage = error.response?.data?.error || 'Ошибка при загрузке тестов'
					Notification(errorMessage, 'red')
					set({ loading: false })
				})
		}
	},
	deleteTest: (test_id: number) => {
		AxiosInstance.delete(`/test/delete/${test_id}`)
			.then(() => {
				set(state => ({
					tests: state.tests.filter(test => test.ID !== test_id),
					loading: false
				}))
			})
			.catch(error => {
				const errorMessage = error.response?.data?.error || 'Ошибка при удалении теста'
				Notification(errorMessage, 'red')
				set({ loading: false })
			})
	},
	changeActive: (test_id: number, is_active: boolean) => {
		AxiosInstance.put('/test/changeActive', {
			test_id,
			is_active
		})
			.then(() => {
				set(state => ({
					tests: state.tests.map(test => (test.ID === test_id ? { ...test, is_active } : test))
				}))
			})
			.catch(error => {
				const errorMessage = error.response?.data?.error || 'Ошибка при изменении статуса теста'
				Notification(errorMessage, 'red')
			})
	}
}))
