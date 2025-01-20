import { create } from 'zustand'
import { Test } from './use-create-test-store'
import { AxiosInstance } from '../helpers/constants/instance'

interface UseGetTestById {
    loading: boolean
    test: Test
    getTestById: (id: number) => void
}

export const useGetTestById = create<UseGetTestById>(set => ({
    loading: true,
    test: {
        name: '',
        questions: []
    },
    getTestById: (id: number) => {
        AxiosInstance.get(`/test/getById/${id}`).then(res =>
            set({
                test: res.data,
                loading: false
            })
        )
    }
}))
