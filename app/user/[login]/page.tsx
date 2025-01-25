'use client'
import { User, useUserStore } from '@/components/stores/use-user-store'
import { CustomButton } from '@/components/ui'
import { CustomLoader } from '@/components/ui/custom-loader'
import { Avatar, Flex, TextInput } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'

const UserPage: FC = () => {
	const { user, updateUserData, logout, getUserByLogin, loading } = useUserStore()
	const [isUpdateData, setIsUpdateData] = useState(false)
	const [updateData, setUpdateData] = useState<User>({
		name: user.name,
		login: user.login,
		email: user.email,
		password: '',
		avatar: ''
	})
	const { login } = useParams()
	const { width } = useViewportSize()
	const inputSize = useMemo(() => (width <= 426 ? '100%' : 400), [width])

	useEffect(() => {
		getUserByLogin(login as string)
		setUpdateData({
			name: user.name,
			login: user.login,
			email: user.email,
			password: user.password,
			avatar: user.avatar
		})
	}, [getUserByLogin, login, user.avatar, user.email, user.login, user.name, user.password])

	const handleUpdate = () => {
		if (updateData) {
			updateUserData(updateData, user.login)
		}
		setIsUpdateData(false)
	}

	const isValid = updateData.name != user.name && updateData.login != user.name && updateData.email != user.name

	if (loading) {
		return <CustomLoader />
	}
	return (
		<Flex justify='center' align='center' h='80vh'>
			<Flex direction='column' gap={5}>
				<Avatar src={user.avatar || ''} w={100} h={100} mb={20} className='block m-auto' />

				<TextInput
					value={updateData.name}
					onChange={e => setUpdateData({ ...updateData, name: e.currentTarget.value })}
					label='Ваше имя'
					disabled={!isUpdateData}
					w={inputSize}
				/>
				<TextInput
					value={updateData.login}
					onChange={e => setUpdateData({ ...updateData, login: e.currentTarget.value })}
					label='Ваш логин'
					disabled={!isUpdateData}
					w={inputSize}
				/>
				<TextInput
					value={updateData.email}
					onChange={e => setUpdateData({ ...updateData, email: e.currentTarget.value })}
					label='Ваша почта'
					disabled={!isUpdateData}
					w={inputSize}
				/>
				<CustomButton
					mt={50}
					onClick={isUpdateData ? handleUpdate : () => setIsUpdateData(true)}
					variant={isUpdateData ? 'outline' : ''}
					disabled={isUpdateData && !isValid}
				>
					{isUpdateData ? 'Подтвердить' : 'Изменить данные'}
				</CustomButton>
				{isUpdateData ? (
					<CustomButton mt={10} onClick={() => setIsUpdateData(false)} color='red' variant='subtle'>
						Отмена
					</CustomButton>
				) : (
					<CustomButton mt={10} variant='outline' onClick={logout}>
						Выйти из аккаунта
					</CustomButton>
				)}
			</Flex>
		</Flex>
	)
}

UserPage.displayName = 'UserPage'
export default UserPage
