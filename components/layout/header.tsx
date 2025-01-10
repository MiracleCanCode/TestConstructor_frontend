'use client'
import {
    ActionIcon,
    Avatar,
    Container,
    Divider,
    Flex,
    useComputedColorScheme,
    useMantineColorScheme,
} from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { CustomButton } from '../ui'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { token } from '../helpers/constants/token'
import { useUserStore } from '../stores/use-user-store'
import { FaRegSun, FaRegMoon, FaArrowLeft } from 'react-icons/fa'

const IsAuthContent: FC = () => {
    const { user } = useUserStore()

    return (
        <Flex justify='flex-end'>
            <Link href={`/user/${user.login}`}>
                <Avatar src={user.avatar ?? ''} />
            </Link>
        </Flex>
    )
}

const DontAuthContent: FC = () => (
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
)

export const Header: FC = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [showBackButton, setShowBackButton] = useState(false)
    const pathname = usePathname()
    const params = useParams()
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light', {
        getInitialValueInEffect: true,
    })
    const { getUserData } = useUserStore()

    useEffect(() => {
        if (token) getUserData()

        setIsVisible(pathname !== '/auth')
        setShowBackButton(pathname !== '/dashboard')
    }, [pathname, getUserData])

    if (!isVisible) return null

    return (
        <header>
            <Container fluid className='pb-3'>
                <Flex justify='space-between' align='center'>
                    {showBackButton ? (
                        <Link href='/dashboard'>
                            <CustomButton variant='subtle'>
                                <FaArrowLeft className='mr-3' /> На главную
                            </CustomButton>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {token && pathname !== `/user/${params.login}` && (
                        <Flex justify='flex-end' w='100%' mr='10px'>
                            <ActionIcon
                                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                                variant='transparent'
                                size='xl'
                            >
                                {computedColorScheme === 'light' ? <FaRegSun /> : <FaRegMoon />}
                            </ActionIcon>
                        </Flex>
                    )}

                    {token ? pathname === `/user/${params.login}` ? null : <IsAuthContent /> : <DontAuthContent />}
                </Flex>
            </Container>
            <Divider />
        </header>
    )
}

Header.displayName = 'Header'
