import { create } from 'zustand'
import { AxiosInstance } from '../helpers/constants/instance'

interface User {
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
        AxiosInstance.get('/user/getData').then((res) => set({ user: res.data }))
    },
}))
