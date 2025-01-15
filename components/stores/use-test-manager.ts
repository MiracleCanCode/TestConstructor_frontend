import { create } from 'zustand'
import { Test } from './use-create-test-store'
import { AxiosInstance } from '../helpers/constants/instance'
import { token } from '../helpers/constants/token'
import { ErrorNotification } from '../ui'

interface UseTestManager {
    tests: Test[]
    getTests: (user_id: number, offset?: number, limit?: number) => void
    deleteTest: (test_id: number) => void
}

export const useTestManager = create<UseTestManager>((set) => ({
    tests: [],
    getTests: (user_id: number, offset?: number, limit?: number) => {
        if (token && user_id !== 0) {
            AxiosInstance.post('/test/getAll', {
                offset: offset,
                limit: limit,
                user_id: user_id,
            }).then((res) => set({ tests: res.data.tests }))
        }
    },
    deleteTest: (test_id: number) => {
        AxiosInstance.delete(`/test/delete/${test_id}`).catch(() => ErrorNotification())
    },
}))
