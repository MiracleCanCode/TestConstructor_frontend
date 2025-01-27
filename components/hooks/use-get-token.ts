import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const useGetToken = () => {
	const [token, setToken] = useState<string | null | undefined>(null)

	useEffect(() => {
		const tokenFromCookie = Cookies.get('token')
		setToken(tokenFromCookie)
	}, [])

	return {
		token
	}
}
