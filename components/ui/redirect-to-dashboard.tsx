'use client'
import { FC, ReactNode, useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { token } from '../helpers/constants/token'

interface Props {
    children: ReactNode
}

export const RedirectToDashboard: FC<Props> = ({ children }) => {
    const pathname = usePathname()
    useEffect(() => {
        if (token && pathname === '/auth') {
            redirect('/dashboard')
        }
    }, [pathname])

    return <>{children}</>
}

RedirectToDashboard.displayName = 'RedirectToDashboardComponent'
