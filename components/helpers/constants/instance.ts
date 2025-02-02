import axios from 'axios'
import Cookies from 'js-cookie'

export const AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080/api'
})

AxiosInstance.interceptors.request.use(
	config => {
		const token = Cookies.get('token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
