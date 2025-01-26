import axios from 'axios'
import { token } from './token'

export const AxiosInstance = axios.create({
	baseURL: 'https://stranger-question-kid-defence.trycloudflare.com/api'
})

AxiosInstance.interceptors.request.use(
	config => {
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
