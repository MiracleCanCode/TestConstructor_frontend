'use client'
import { Flex } from '@mantine/core'
import { FC, useEffect, useState, useRef } from 'react'

import { AuthForm, AuthState } from './components/auth-form'
import { useUrlParams } from '@/components/hooks/use-url-param'

const Auth: FC = () => {
	const { setUrlParam, getUrlParam } = useUrlParams()
	const [mode, setMode] = useState<AuthState>('login')
	const initialRender = useRef(true)
	useEffect(() => {
		if (initialRender.current) {
			const currentMode = getUrlParam('mode') as AuthState
			if (currentMode === 'registration' || currentMode === 'login') {
				setMode(currentMode)
			}
			initialRender.current = false
		}
	}, [getUrlParam])

	useEffect(() => {
		setUrlParam('mode', mode)
	}, [mode, setUrlParam])

	return (
		<Flex justify='center' align='center' h='90dvh'>
			<AuthForm
				mode={mode}
				switchMode={() => setMode(prevMode => (prevMode === 'login' ? 'registration' : 'login'))}
			/>
		</Flex>
	)
}

Auth.displayName = 'AuthPage'
export default Auth
