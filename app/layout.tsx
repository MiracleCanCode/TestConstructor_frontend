import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'public/styles/globals.css'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { MantineProvider, Container } from '@mantine/core'
import '@mantine/notifications/styles.css'
import { FC, ReactNode } from 'react'
import { Notifications } from '@mantine/notifications'
import { Header } from '@/components/layout/header'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Test constructor',
	description: 'Лучший сервис для создания тестов'
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<html lang='ru'>
		<body className={font.className}>
			<MantineProvider defaultColorScheme='auto'>
				<Notifications position='bottom-right' />
				<Container fluid pt={20}>
					<Header />
					{children}
				</Container>
			</MantineProvider>
		</body>
	</html>
)

export default RootLayout
