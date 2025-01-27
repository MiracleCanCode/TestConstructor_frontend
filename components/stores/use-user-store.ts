import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { ErrorNotification, Notification } from '../ui'

export interface User {
	id?: number
	login: string
	password: string
	email: string
	name: string
	avatar?: string
}

interface IUseUserStore {
	loading: boolean
	user: User
	setUser: (user: User) => void
	getUserData: (token: string) => void
	updateUserData: (user: User, userLogin: string) => void
	logout: () => void
	getUserByLogin: (login: string) => void
}

export const useUserStore = create<IUseUserStore>(set => ({
	loading: true,
	user: {
		id: 0,
		login: '',
		password: '',
		email: '',
		name: '',
		avatar: ''
	},
	setUser: (user: User) => set({ user: user }),
	getUserData: (token: string) => {
		if (token) {
			AxiosInstance.get('/user/getData')
				.then(res => {
					if (res.data) {
						set({ user: res.data, loading: false })
					} else {
						localStorage.removeItem('token')
					}
				})

				.catch(err => {
					console.log(err)
					localStorage.removeItem('token')
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
				set({ user: user, loading: false })
				Notification('Вы успешно обновили свои данные')
			})
			.catch(() => ErrorNotification())
	},
	logout: () => {
		Notification('Вы успешно вышли из аккаунта!', 'green')
		location.reload()
		localStorage.removeItem('token')
	},
	getUserByLogin: (login: string) => {
		AxiosInstance.post('/user/getByLogin', {
			login: login
		})
			.then(res => set({ user: res.data, loading: false }))
			.catch(() => ErrorNotification())
	}
}))
