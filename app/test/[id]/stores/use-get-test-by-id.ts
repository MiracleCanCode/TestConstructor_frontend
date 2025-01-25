import { create } from 'zustand'

import { AxiosInstance } from '@/components/helpers/constants/instance'
import { Test } from '@/components/helpers/interfaces/interface'

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
