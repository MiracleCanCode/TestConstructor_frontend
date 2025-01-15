import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { ErrorNotification } from '../ui'
import { token } from '../helpers/constants/token'

export interface Variant {
    name: string
    isCorrect: boolean
}

export interface Question {
    name: string
    description?: string
    variants: Variant[]
}

export interface Test {
    ID?: number
    name: string
    description?: string
    questions: Question[]
}

interface IUseCreateTestStore {
    test: Test
    createTest: (test: Test) => void
    createQuestion: (question: Question) => void
}

export const useCreateTestStore = create<IUseCreateTestStore>((set) => ({
    test: {
        name: '',
        questions: [],
    },
    createTest: (testCreate: Test) => {
        set({ test: testCreate })
        if (token) {
            AxiosInstance.post('/test/create', testCreate)
                .then((res) => set({ test: res.data }))
                .catch(() => {
                    ErrorNotification()
                    set({ test: { name: '', questions: [] } })
                })
        }
    },

    createQuestion: (question: Question) => {
        set((state) => ({
            test: {
                ...state.test,
                questions: [...state.test.questions, question],
            },
        }))
    },
}))
