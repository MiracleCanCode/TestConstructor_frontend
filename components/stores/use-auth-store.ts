import { AxiosInstance } from '@/components/helpers/constants/instance'
import { create } from 'zustand'
import { ErrorNotification, Notification } from '@/components/ui'
import { useUserStore } from './use-user-store'

interface User {
    login: string
    password: string
    email: string
    name: string
}

interface IUseAuthStore {
    user: User
    auth: (user: User) => void
    registration: (user: User, onSuccess: () => void) => void
}

export const useAuthStore = create<IUseAuthStore>((set) => ({
    user: {
        login: '',
        password: '',
        email: '',
        name: '',
    },
    auth: (user: User) => {
        AxiosInstance.post('/login', {
            login: user.login,
            password: user.password,
        })
            .then((res) => {
                Notification('Вы успешно вошли в аккаунт!', 'green')
                localStorage.setItem('token', res.data.token)
                useUserStore.getState().setUser(user)
                set({ user: user })
            })
            .catch((error) => {
                ErrorNotification()
                console.error('Login failed', error)
            })
    },
    registration: (user: User, onSuccess: () => void) => {
        AxiosInstance.post('/registration', user)
            .then(() => {
                Notification('Вы успешно зарегистрировались!', 'green')

                set({ user: user })
                if (onSuccess) {
                    onSuccess()
                }
            })
            .catch((error) => {
                ErrorNotification()
                console.error('Registration failed', error)
            })
    },
}))
