interface ErrorWithResponse {
	response?: {
		data?: {
			error?: string
		}
	}
}

export const errorMessage = (error: ErrorWithResponse) => error.response?.data?.error || 'Произошла ошибка'
