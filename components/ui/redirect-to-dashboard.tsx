'use client'
import { FC, ReactNode, useEffect } from 'react'
import { redirect, useParams, usePathname } from 'next/navigation'
import { token } from '../helpers/constants/token'

interface Props {
    children: ReactNode
}

export const RedirectToDashboard: FC<Props> = ({ children }) => {
    const pathname = usePathname()
    const params = useParams()
    useEffect(() => {
        if (token && pathname === '/auth') {
            redirect('/dashboard')
        }
        if (!token && pathname === `/user/${params.login}`) {
            redirect('/dashboard')
        }
    }, [params.login, pathname])

    return <>{children}</>
}

RedirectToDashboard.displayName = 'RedirectToDashboardComponent'
