import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getEnv } from '@/lib/get-env'

export type ApiError = {
	message: string
	errors?: Record<string, string[]>
}

const axiosInstance = axios.create({
	baseURL: getEnv(import.meta.env.VITE_BACKEND_API_URL),
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export async function apiClient<T>(
	endpoint: string,
	options: AxiosRequestConfig = {}
): Promise<T> {
	try {
		const response = await axiosInstance({
			url: endpoint,
			...options,
		})
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw error.response.data as ApiError
		}
		throw { message: 'An unexpected error occurred' } as ApiError
	}
}
