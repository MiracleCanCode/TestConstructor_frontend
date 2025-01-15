'use client'
import { FC, ReactNode, useEffect } from 'react'
import { redirect, useParams, usePathname } from 'next/navigation'
import { token } from '../helpers/constants/token'

interface Props {
    children: ReactNode
}

export const RedirectTo: FC<Props> = ({ children }) => {
    const pathname = usePathname()
    const params = useParams()
    useEffect(() => {
        if (token && pathname === '/auth') {
            redirect('/dashboard')
        }
        if (!token && pathname === `/user/${params.login}`) {
            redirect('/auth')
        }

        if (!token && pathname === `/create_test`) {
            redirect('/auth')
        }

        if (!token && pathname === `/dashboard`) {
            redirect('/auth')
        }
    }, [params.login, pathname])

    return <>{children}</>
}

RedirectTo.displayName = 'RedirectTo'
