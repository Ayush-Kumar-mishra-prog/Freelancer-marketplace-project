import axios, {
    type InternalAxiosRequestConfig,
} from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
})

type RetriableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean
}

let refreshRequest: Promise<void> | null = null

api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
            return Promise.reject(error)
        }

        const request = error.config as RetriableRequestConfig | undefined
        const url = request?.url ?? ''
        if (
            !request ||
            request._retry ||
            url.endsWith('/refresh') ||
            url.endsWith('/login') ||
            url.endsWith('/register')
        ) {
            return Promise.reject(error)
        }

        request._retry = true
        try {
            refreshRequest ??= api
                .post('/auth/api/v1/auth/refresh')
                .then(() => undefined)
                .finally(() => {
                    refreshRequest = null
                })
            await refreshRequest
            return api(request)
        } catch (refreshError) {
            return Promise.reject(refreshError)
        }
    },
)

export default api