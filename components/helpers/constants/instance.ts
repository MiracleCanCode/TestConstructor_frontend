import axios from 'axios'

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:4200',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
