import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { Notification } from '../ui'
import { User } from '../helpers/interfaces/interface'
import { errorMessage } from '../helpers/error-message'

interface State {
	loading: boolean
	user: User
}

interface Actions {
	setUser: (user: User) => void
	getUserData: (token: string) => void
	updateUserData: (user: User, userLogin: string) => void
	logout: () => void
	getUserByLogin: (login: string) => void
}

export const useUserStore = create<State & Actions>(set => ({
	loading: true,
	user: {
		id: 0,
		login: '',
		password: '',
		email: '',
		name: '',
		avatar: ''
	},
	setUser: (user: User) => set({ user }),
	getUserData: (token: string) => {
		if (token) {
			AxiosInstance.get('/user/getData')
				.then(res => {
					if (res.data) {
						set({ user: res.data, loading: false })
					}
				})
				.catch(err => {
					Notification(errorMessage(err), 'red')
				})
		}
	},
	updateUserData: (user: User, userLogin: string) => {
		AxiosInstance.post('/user/update', {
			user_login: userLogin,
			data: {
				name: user.name,
				avatar: user.avatar
			}
		})
			.then(() => {
				set({ user, loading: false })
				Notification('Вы успешно обновили свои данные', 'green')
			})
			.catch(err => {
				Notification(errorMessage(err), 'red')
			})
	},
	logout: () => {
		AxiosInstance.get('/auth/logout')
			.then(() => {
				Notification('Вы успешно вышли из аккаунта!', 'green')
				set({
					loading: false
				})
				window.location.reload()
			})
			.catch(err => {
				Notification(errorMessage(err), 'red')
			})
	},
	getUserByLogin: (login: string) => {
		AxiosInstance.post('/user/getByLogin', {
			login
		})
			.then(res => set({ user: res.data, loading: false }))
			.catch(err => {
				Notification(errorMessage(err), 'red')
			})
	}
}))
