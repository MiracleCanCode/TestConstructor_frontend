import { create } from 'zustand'

import { AxiosInstance } from '@/components/helpers/constants/instance'
import { Test } from '@/components/helpers/interfaces/interface'
import { redirect } from 'next/navigation'

interface State {
	loading: boolean
	test: Test
}

interface Actions {
	getTestById: (id: number) => void
}

export const useGetTestById = create<State & Actions>(set => ({
	loading: false,
	test: {
		name: '',
		questions: []
	},
	getTestById: async (id: number) => {
		try {
			set({ loading: true })
			const res = await AxiosInstance.get(`/test/getById/${id}`)
			set({
				test: res.data,
				loading: false
			})
		} catch (err) {
			set({ loading: false, test: { name: '', questions: [] } })
			console.error(err)
			redirect('/not_found')
		}
	}
}))
