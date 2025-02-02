import { AxiosInstance } from '@/components/helpers/constants/instance'
import { create } from 'zustand'
import { Notification } from '@/components/ui'
import { useUserStore } from '@/components/stores/use-user-store'
import { errorMessage } from '@/components/helpers/error-message'
import Cookie from 'js-cookie'

interface State {
	login: string
	password: string
	email: string
	name: string
}

interface Error {
	authError: string
}

interface Actions {
	auth: (user: State, redirect: () => void) => void
	registration: (user: State, onSuccess: () => void) => void
}

export const useAuthStore = create<Actions & Error>(set => ({
	authError: '',
	auth: async (user, redirect) => {
		try {
			const response = await AxiosInstance.post('/auth/login', {
				login: user.login,
				password: user.password
			})

			const userData = response.data

			Cookie.set('token', userData.token, {
				path: '/',
				expires: 7
			})

			Notification('Вы успешно вошли в аккаунт!', 'green')
			useUserStore.getState().setUser(userData)
			redirect()
		} catch (error) {
			const errorMsg = errorMessage(error || '')
			set(() => ({ authError: errorMsg }))
			Notification(errorMsg, 'red')
		}
	},
	registration: async (user: State, onSuccess: () => void) => {
		try {
			await AxiosInstance.post('/auth/registration', user)
			Notification('Вы успешно зарегистрировались!', 'green')
			if (onSuccess) {
				onSuccess()
			}
		} catch (error) {
			const errorMsg = errorMessage(error || '')
			set(() => ({ authError: errorMsg }))
			Notification(errorMsg, 'red')
		}
	}
}))
