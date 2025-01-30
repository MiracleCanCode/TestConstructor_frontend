import { CustomButton } from '@/components/ui'
import { Flex } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

export const DontAuthContent: FC = () => (
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

DontAuthContent.displayName = 'DontAuthContentComponent'
