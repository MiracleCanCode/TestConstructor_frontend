'use client'
import { Flex } from '@mantine/core'
import { FC, useState } from 'react'

import { AuthForm, AuthState } from './components/auth-form'

const Auth: FC = () => {
    const [mode, setMode] = useState<AuthState>('login')

    return (
        <Flex justify='center' align='center' h='100vh'>
            <AuthForm mode={mode} switchMode={() => setMode(mode === 'login' ? 'registration' : 'login')} />
        </Flex>
    )
}

Auth.displayName = 'AuthPage'
export default Auth
