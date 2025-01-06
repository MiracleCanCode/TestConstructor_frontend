'use client'

import { Avatar, Container, Flex } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { CustomButton } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { token } from '../helpers/constants/token'
import { useUserStore } from '../stores/use-user-store'

const IsAuthHeader = () => {
    const user = useUserStore().user
    return (
        <Flex justify='flex-end'>
            <Avatar src={user.avatar ?? ''} />
        </Flex>
    )
}
const DontAuthHeader = () => (
    <Flex>
        <Flex gap='xs' justify='flex-end' w='100%'>
            <Link href='/auth'>
                <CustomButton w='100px'>Войти</CustomButton>
            </Link>
            <Link href={{ pathname: '/auth', query: { mode: 'registration' } }}>
                <CustomButton variant='outline' w='210px'>
                    Зарегистрироваться
                </CustomButton>
            </Link>
        </Flex>
    </Flex>
)

export const Header: FC = () => {
    const [show, setShow] = useState<boolean>(true)
    const pathname = usePathname()
    const user = useUserStore()

    useEffect(() => {
        if (token) {
            user.getUserData()
        }
        if (pathname === '/auth') {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [pathname])

    return show ? (
        <header>
            <Container fluid className='border-b-2 pb-3 border-gray'>
                {token ? <IsAuthHeader /> : <DontAuthHeader />}
            </Container>
        </header>
    ) : null
}

Header.displayName = 'Header'
