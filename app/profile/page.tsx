'use client'
import { User } from '@/components/helpers/interfaces/interface'
import { useUserStore } from '@/components/stores/use-user-store'
import { CustomButton } from '@/components/ui'
import { CustomLoader } from '@/components/ui/custom-loader'
import { Avatar, Flex, Modal, TextInput } from '@mantine/core'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import { FC, useEffect, useState, useCallback, useMemo } from 'react'

const UserPage: FC = () => {
	const { user, updateUserData, logout, loading } = useUserStore()
	const [isUpdateData, setIsUpdateData] = useState(false)
	const [updateData, setUpdateData] = useState<User>({
		name: user.name,
		login: user.login,
		email: user.email,
		password: '',
		avatar: user.avatar || ''
	})
	const { width } = useViewportSize()
	const inputSize = useMemo(() => (width <= 426 ? '100%' : 400), [width])
	const [openedExitModal, { open, close }] = useDisclosure(false)

	useEffect(() => {
		setUpdateData({
			name: user.name,
			login: user.login,
			email: user.email,
			password: '',
			avatar: user.avatar || ''
		})
	}, [user])

	const handleUpdate = useCallback(() => {
		if (updateData && updateData.name !== user.name) {
			updateUserData(updateData, user.login)
			setIsUpdateData(false)
		}
	}, [updateData, user, updateUserData])

	const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdateData(prevData => ({
			...prevData,
			name: event.target.value
		}))
	}, [])

	const isValid = updateData && updateData.name !== user.name

	if (loading || !updateData) return <CustomLoader />

	return (
		<Flex justify='center' align='center' h='80vh'>
			<Flex direction='column' gap={5}>
				<Avatar name={user.login} w={100} h={100} mb={20} className='block m-auto' />
				<TextInput
					value={updateData.name}
					onChange={handleNameChange}
					label='Ваше имя'
					disabled={!isUpdateData}
					w={inputSize}
				/>
				<TextInput
					value={updateData.login}
					onChange={e => setUpdateData({ ...updateData, login: e.currentTarget.value })}
					label='Ваш логин'
					disabled
					w={inputSize}
				/>
				<TextInput
					value={updateData.email}
					onChange={e => setUpdateData({ ...updateData, email: e.currentTarget.value })}
					label='Ваша почта'
					disabled
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
				<Modal
					opened={openedExitModal}
					onClose={close}
					title='Вы действительно хотите выйти из аккаунта?'
					centered
				>
					<CustomButton w='100%' onClick={logout}>
						Да, я хочу выйти
					</CustomButton>
					<CustomButton w='100%' mt={10} variant='outline' onClick={close}>
						Нет, я не хочу выйти
					</CustomButton>
				</Modal>
				{isUpdateData ? (
					<CustomButton mt={10} onClick={() => setIsUpdateData(false)} color='red' variant='subtle'>
						Отмена
					</CustomButton>
				) : (
					<CustomButton mt={10} variant='outline' onClick={open}>
						Выйти из аккаунта
					</CustomButton>
				)}
			</Flex>
		</Flex>
	)
}

UserPage.displayName = 'UserPage'
export default UserPage
