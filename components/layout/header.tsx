'use client'
import { ActionIcon, Container, Divider, Flex, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { FC, useEffect, useMemo, useState } from 'react'
import { CustomButton, CustomTooltip } from '../ui'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useGetToken } from '../hooks/use-get-token'
import { useUserStore } from '../stores/use-user-store'
import { FaArrowLeft } from 'react-icons/fa'
import { FiMoon } from 'react-icons/fi'
import { FiSun } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { IsAuthContent } from './components/auth-content'
import { DontAuthContent } from './components/not-auth-content'

export const Header: FC = () => {
	const [isVisible, setIsVisible] = useState(true)
	const [showBackButton, setShowBackButton] = useState(false)
	const pathname = usePathname()
	const params = useParams()
	const { setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true
	})
	const { token } = useGetToken()
	const { getUserData } = useUserStore()
	const iconColor = useMemo(() => (computedColorScheme === 'light' ? 'black' : 'white'), [computedColorScheme])
	const labelForChangeTheme = useMemo(
		() => (computedColorScheme === 'light' ? 'Сменить тему на темную' : 'Сменить тему на светлую'),
		[computedColorScheme]
	)
	const content = useMemo(
		() => (token ? pathname === `/user/${params.login}` ? null : <IsAuthContent /> : <DontAuthContent />),
		[token]
	)
	const isMainPage = useMemo(() => token && pathname !== `/user/${params.login}`, [token, pathname, params.login])

	useEffect(() => {
		if (token) getUserData(token)

		setIsVisible(pathname !== '/auth')
		setShowBackButton(pathname !== '/dashboard')
	}, [pathname, getUserData, token])

	if (!isVisible) return null

	return (
		<header>
			<Container fluid className='pb-3'>
				<Flex justify='space-between' align='center'>
					{showBackButton && (
						<Link href='/dashboard'>
							<CustomButton variant='subtle'>
								<FaArrowLeft className='mr-3' /> На главную
							</CustomButton>
						</Link>
					)}

					{isMainPage && (
						<>
							<Flex justify='flex-end' w='100%' mr='10px'>
								<CustomTooltip label={labelForChangeTheme}>
									<ActionIcon
										onClick={() =>
											setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
										}
										variant='transparent'
										color={iconColor}
										size='xl'
									>
										{computedColorScheme === 'light' ? <FiSun size='20' /> : <FiMoon size='20' />}
									</ActionIcon>
								</CustomTooltip>
							</Flex>
							<Link href='/create_test' className=' mr-5'>
								<CustomTooltip label='На страницу с созданием теста'>
									<FiPlus color={iconColor} size='25' />
								</CustomTooltip>
							</Link>
						</>
					)}
					{content}
				</Flex>
			</Container>
			<Divider />
		</header>
	)
}

Header.displayName = 'Header'
