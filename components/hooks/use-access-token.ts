import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

export const useAccessToken = () => {
	const [token, setToken] = useState<string>('')

	useEffect(() => {
		setToken(Cookie.get('token') || '')
	}, [token])

	return {
		token
	}
}
