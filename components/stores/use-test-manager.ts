import { create } from 'zustand'
import { Test } from './use-create-test-store'
import { AxiosInstance } from '../helpers/constants/instance'
import { token } from '../helpers/constants/token'
import { ErrorNotification } from '../ui'

interface UseTestManager {
    tests: Test[]
    loading: boolean
    getTests: (user_id: number, offset?: number, limit?: number) => void
    deleteTest: (test_id: number) => void
    changeActive: (test_id: number, is_active: boolean) => void
}

export const useTestManager = create<UseTestManager>(set => ({
    tests: [],
    loading: true,
    getTests: (user_id: number, offset?: number, limit?: number) => {
        if (token && user_id !== 0) {
            AxiosInstance.post('/test/getAll', {
                offset: offset,
                limit: limit,
                user_id: user_id
            }).then(res => set({ tests: res.data.tests, loading: false }))
        }
    },
    deleteTest: (test_id: number) => {
        AxiosInstance.delete(`/test/delete/${test_id}`).catch(() => ErrorNotification())
        set(state => ({
            tests: state.tests.filter(test => test.ID !== test_id),
            loading: false
        }))
    },
    changeActive: (test_id: number, is_active: boolean) => {
        AxiosInstance.put('/test/changeActive', {
            test_id,
            is_active
        })
    }
}))
