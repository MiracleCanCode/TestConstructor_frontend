import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { ErrorNotification } from '../ui'

interface Variant {
    name: string
    isCorrect: boolean
}

interface Question {
    name: string
    variantAnswer: Variant[]
}

interface Test {
    name: string
    description?: string
    questions: Question[]
}

interface IUseCreateTestStore {
    test: Test
    createTest: (test: Test) => void
    createQuestion: (question: Question) => void
    addVariantToQuestion: (variant: Variant, questionIndex: number) => void
}

export const useCreateTestStore = create<IUseCreateTestStore>((set) => ({
    test: {
        name: '',
        questions: [],
    },
    createTest: (testCreate: Test) => {
        set({ test: testCreate })
        AxiosInstance.post('/test/create', testCreate)
            .then((res) => set({ test: res.data }))
            .catch(() => {
                ErrorNotification()
                set({ test: { name: '', questions: [] } })
            })
    },

    createQuestion: (question: Question) =>
        set((state) => ({
            test: {
                ...state.test,
                questions: [...state.test.questions, { ...question }],
            },
        })),

    addVariantToQuestion: (variant: Variant, questionIndex: number) =>
        set((state) => {
            const updatedQuestions = [...state.test.questions]
            updatedQuestions[questionIndex].variantAnswer.push(variant)
            return {
                test: {
                    ...state.test,
                    questions: updatedQuestions,
                },
            }
        }),
}))
