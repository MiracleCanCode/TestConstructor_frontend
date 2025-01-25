'use client'

import { CustomButton } from '@/components/ui'
import { PasswordInput, TextInput, Title } from '@mantine/core'
import { useAuthStore } from '@/app/auth/stores/use-auth-store'
import { useForm } from '@mantine/form'
import { FC, useMemo } from 'react'
import { validateField } from '../helpers/validate-fields'

export type AuthState = 'login' | 'registration'

export const AuthForm: FC<{ mode: AuthState; switchMode: () => void }> = ({ mode, switchMode }) => {
	const auth = useAuthStore()
	const isRegistrationMode = useMemo(() => mode === 'registration', [mode])
	const isLoginMode = useMemo(() => mode === 'login', [mode])

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', email: '', password: '', login: '', confirmPassword: '' },
		validate: {
			name: value => validateField(value, 'name', mode),
			email: value => validateField(value, 'email', mode),
			login: value => validateField(value, 'login', mode),
			password: value => validateField(value, 'password', mode),
			confirmPassword: (value, values) =>
				isRegistrationMode && value !== values.password ? 'Пароли не совпадают' : null
		}
	})

	const { name, email, password, login } = form.getValues()
	const submit = () => {
		const user = { name, email, password, login }

		if (isRegistrationMode) {
			form.reset()
			auth.registration(user, () => {
				switchMode()
			})
			return
		}

		auth.auth(user)
	}

	const toggleMode = () => {
		switchMode()
		form.reset()
	}

	return (
		<div className='w-96'>
			<Title order={2} mb={50} className='text-center'>
				{isLoginMode ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'}
			</Title>
			<form onSubmit={form.onSubmit(submit)}>
				{isRegistrationMode && (
					<TextInput
						label='Введите ваше имя'
						mt='10px'
						key={form.key('name')}
						{...form.getInputProps('name')}
					/>
				)}
				<TextInput label='Введите ваш логин' key={form.key('login')} {...form.getInputProps('login')} />
				{isRegistrationMode && (
					<TextInput
						label='Введите вашу почту'
						mt='10px'
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
				)}
				<PasswordInput
					label='Введите ваш пароль'
					mt='10px'
					key={form.key('password')}
					{...form.getInputProps('password')}
				/>
				{isRegistrationMode && (
					<PasswordInput
						label='Повторите ваш пароль'
						mt='10px'
						key={form.key('confirmPassword')}
						{...form.getInputProps('confirmPassword')}
					/>
				)}
				<CustomButton w='100%' mt='10px' type='submit'>
					{isLoginMode ? 'Войти' : 'Зарегистрироваться'}
				</CustomButton>
			</form>
			<CustomButton onClick={toggleMode} w='100%' mt='10px' variant='outline'>
				{isLoginMode ? 'Нет аккаунта?' : 'Есть аккаунт?'}
			</CustomButton>
		</div>
	)
}

AuthForm.displayName = 'AuthForm'
