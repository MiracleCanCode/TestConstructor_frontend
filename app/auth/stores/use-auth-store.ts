import { AxiosInstance } from '@/components/helpers/constants/instance'
import { create } from 'zustand'
import { Notification } from '@/components/ui'
import { useUserStore } from '../../../components/stores/use-user-store'
import { errorMessage } from '@/components/helpers/error-message'

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
	auth: (user: State) => void
	registration: (user: State, onSuccess: () => void) => void
}

export const useAuthStore = create<Actions & Error>(set => ({
	authError: '',
	auth: (user: State) => {
		AxiosInstance.post('/auth/login', {
			login: user.login,
			password: user.password
		})
			.then(response => {
				const userData = response.data
				Notification('Вы успешно вошли в аккаунт!', 'green')
				useUserStore.getState().setUser(userData)
				window.location.reload()
			})
			.catch(error => {
				set(() => ({
					authError: errorMessage(error)
				}))
				Notification(errorMessage(error), 'red')
			})
	},
	registration: (user: State, onSuccess: () => void) => {
		AxiosInstance.post('/auth/registration', user)
			.then(() => {
				Notification('Вы успешно зарегистрировались!', 'green')
				if (onSuccess) {
					onSuccess()
				}
			})
			.catch(error => {
				set(() => ({
					authError: errorMessage(error)
				}))
				Notification(errorMessage(error), 'red')
			})
	}
}))
