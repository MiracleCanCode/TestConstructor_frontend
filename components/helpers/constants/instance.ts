import axios from 'axios'

export const AxiosInstance = axios.create({
	baseURL: 'http://localhost:4210/api',
	withCredentials: true
})
