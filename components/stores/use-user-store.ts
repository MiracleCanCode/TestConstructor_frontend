import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'
import { ErrorNotification, Notification } from '../ui'

export interface User {
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
}

export const useUserStore = create<IUseUserStore>((set) => ({
    user: {
        login: '',
        password: '',
        email: '',
        name: '',
        avatar: '',
    },
    setUser: (user: User) => set({ user: user }),
    getUserData: () => {
        AxiosInstance.get('/user/getData')
            .then((res) => set({ user: res.data }))
            .catch((err) => {
                console.log(err)
                localStorage.removeItem('token')
            })
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
}))
