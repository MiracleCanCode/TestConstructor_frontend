'use client'
import { Container, Divider, Flex, useComputedColorScheme } from '@mantine/core'
import { FC, useEffect, useMemo, useState } from 'react'
import { CustomButton, CustomTooltip } from '../ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '../stores/use-user-store'
import { FaHome } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { IsAuthContent } from './components/auth-content'
import { ToggleTheme } from '../ui/toggle-theme'

export const Header: FC = () => {
	const [isVisible, setIsVisible] = useState(true)
	const [showBackButton, setShowBackButton] = useState(false)
	const pathname = usePathname()
	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true
	})
	const iconColor = useMemo(() => (computedColorScheme === 'light' ? 'black' : 'white'), [computedColorScheme])

	const { getUserData } = useUserStore()

	const isMainPage = useMemo(() => pathname !== '/profile', [pathname])

	useEffect(() => {
		getUserData()
		setIsVisible(pathname !== '/auth')
		setShowBackButton(pathname !== '/dashboard')
	}, [pathname, getUserData])

	if (!isVisible) return null

	return (
		<header>
			<Container fluid className='pb-3'>
				<Flex justify='space-between' align='center'>
					{showBackButton && (
						<Link href='/dashboard'>
							<CustomButton variant='subtle'>
								<FaHome className='mr-3' /> На главную
							</CustomButton>
						</Link>
					)}

					{isMainPage && (
						<>
							<Flex justify='flex-end' w='100%' mr='10px'>
								<ToggleTheme />
							</Flex>
							<Link href='/create_test' className=' mr-5'>
								<CustomTooltip label='На страницу с созданием теста'>
									<FiPlus color={iconColor} size='25' />
								</CustomTooltip>
							</Link>
						</>
					)}
					<IsAuthContent />
				</Flex>
			</Container>
			<Divider />
		</header>
	)
}

Header.displayName = 'Header'
