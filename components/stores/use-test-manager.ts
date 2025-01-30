import { create } from 'zustand'

import { AxiosInstance } from '../helpers/constants/instance'
import { Notification } from '../ui'
import { Test } from '../helpers/interfaces/interface'
import { errorMessage } from '../helpers/error-message'

interface State {
	tests: Test[]
	originalTests: Test[]
	loading: boolean
	count: number
}

interface Actions {
	getTests: (user_id: number, offset?: number, limit?: number, token?: string) => void
	deleteTest: (test_id: number) => void
	changeActive: (test_id: number, is_active: boolean) => void
	sortTests: (mode: string) => void
}

export const useTestManager = create<State & Actions>(set => ({
	tests: [],
	originalTests: [],
	loading: true,
	count: 0,

	getTests: (user_id, offset, limit, token) => {
		if (!token || user_id === 0) {
			set({ loading: false })
			return
		}

		AxiosInstance.post('/test/getAll', { offset, limit, user_id })
			.then(res =>
				set({
					tests: res.data.tests,
					originalTests: res.data.tests,
					loading: false,
					count: res.data.count
				})
			)
			.catch(error => {
				Notification(errorMessage(error), 'red')
				set({ loading: false })
			})
	},

	deleteTest: test_id => {
		AxiosInstance.delete(`/test/delete/${test_id}`)
			.then(() => {
				set(state => ({
					tests: state.tests.filter(test => test.ID !== test_id),
					originalTests: state.originalTests.filter(test => test.ID !== test_id),
					loading: false
				}))
			})
			.catch(error => {
				Notification(errorMessage(error), 'red')
				set({ loading: false })
			})
	},

	changeActive: (test_id, is_active) => {
		AxiosInstance.put('/test/changeActive', { test_id, is_active })
			.then(() => {
				set(state => ({
					tests: state.tests.map(test => (test.ID === test_id ? { ...test, is_active } : test)),
					originalTests: state.originalTests.map(test =>
						test.ID === test_id ? { ...test, is_active } : test
					)
				}))
			})
			.catch(error => {
				Notification(errorMessage(error), 'red')
				set({ loading: false })
			})
	},

	sortTests: mode => {
		set(state => {
			switch (mode) {
				case 'notActive':
					return { tests: state.originalTests.filter(test => !test.is_active) }
				case 'active':
					return { tests: state.originalTests.filter(test => test.is_active) }
				case '':
					return { tests: state.originalTests }
				default:
					return state
			}
		})
	}
}))
