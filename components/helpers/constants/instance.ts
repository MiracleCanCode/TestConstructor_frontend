import axios from 'axios'
import { token } from './token'

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:4210/api',
})

AxiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)
