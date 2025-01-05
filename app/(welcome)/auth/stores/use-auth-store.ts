import { AxiosInstance } from '@/components/helpers/constants/instance'
import { create } from 'zustand'

interface User {
    login: string
    password: string
    email: string
    name: string
}

interface IUseAuthStore {
    user: User
    auth: (user: User) => void
    registration: (user: User) => void
}

export const useAuthStore = create<IUseAuthStore>((set) => ({
    user: {
        login: '',
        password: '',
        email: '',
        name: '',
    },
    auth: (user: User) => {
        AxiosInstance.post('/api/login', {
            login: user.login,
            password: user.password,
        })
            .then(() => {
                set({ user: user })
            })
            .catch((error) => {
                console.error('Login failed', error)
            })
    },
    registration: (user: User) => {
        AxiosInstance.post('/api/registration', user)
            .then(() => {
                set({ user: user })
            })
            .catch((error) => {
                console.error('Login failed', error)
            })
    },
}))
