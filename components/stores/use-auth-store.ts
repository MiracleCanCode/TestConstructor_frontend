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
    auth: (user: User) => void
    registration: (user: User, onSuccess: () => void) => void
}

export const useAuthStore = create<IUseAuthStore>(() => ({
    auth: (user: User) => {
        AxiosInstance.post('/auth/login', {
            login: user.login,
            password: user.password,
        })
            .then((res) => {
                Notification('Вы успешно вошли в аккаунт!', 'green')
                location.reload()
                localStorage.setItem('token', res.data.token)
                useUserStore.getState().setUser(user)
            })
            .catch((error) => {
                ErrorNotification()
                console.error('Login failed', error)
            })
    },
    registration: (user: User, onSuccess: () => void) => {
        AxiosInstance.post('/auth/registration', user)
            .then(() => {
                Notification('Вы успешно зарегистрировались!', 'green')

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
