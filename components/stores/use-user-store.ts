import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { ErrorNotification, Notification } from '../ui'
import { token } from '../helpers/constants/token'

export interface User {
    ID?: number
    login: string
    password: string
    email: string
    name: string
    avatar?: string
}

interface IUseUserStore {
    user: User
    setUser: (user: User) => void
    getUserData: () => void
    updateUserData: (user: User, userLogin: string) => void
    logout: () => void
    getUserByLogin: (login: string) => void
}

export const useUserStore = create<IUseUserStore>((set) => ({
    user: {
        ID: 0,
        login: '',
        password: '',
        email: '',
        name: '',
        avatar: '',
    },
    setUser: (user: User) => set({ user: user }),
    getUserData: () => {
        if (token) {
            AxiosInstance.get('/user/getData')
                .then((res) => set({ user: res.data }))
                .catch((err) => {
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
                avatar: user.avatar,
            },
        })
            .then(() => {
                set({ user: user })
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
        AxiosInstance.post('/user/getByLogin', login)
            .then((res) => set({ user: res.data }))
            .catch(() => ErrorNotification())
    },
}))
