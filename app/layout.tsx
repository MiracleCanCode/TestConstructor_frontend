import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'public/styles/globals.css'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/notifications/styles.css'
import React from 'react'
import { Notifications } from '@mantine/notifications'
import { Container } from '@mantine/core'
import { Header } from '@/components/layout/header'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Test constructor',
	description: 'Лучший сервис для создания тестов'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={font.className}>
				<MantineProvider defaultColorScheme='auto'>
					<Container fluid pt={20}>
						<Header />

						<Notifications />
						{children}
					</Container>
				</MantineProvider>
			</body>
		</html>
	)
}
