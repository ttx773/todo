import axios from 'axios'

const runLocal = false

const BASE_URL = runLocal
	? 'http://localhost:3001'
	: 'https://todo-zmqg.onrender.com'

export const apiClient = axios.create({
	baseURL: BASE_URL
})

apiClient.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

apiClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				try {
					const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
						refreshToken
					})
					localStorage.setItem('accessToken', data.accessToken)
					localStorage.setItem('refreshToken', data.refreshToken)
					originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
					return apiClient(originalRequest)
				} catch {
					localStorage.removeItem('accessToken')
					localStorage.removeItem('refreshToken')
					window.location.href = '/login'
				}
			} else {
				window.location.href = '/login'
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
