'use client'

import { CustomButton } from '@/components/ui'
import { PasswordInput, TextInput, Title } from '@mantine/core'
import { useAuthStore } from '@/components/stores/use-auth-store'
import { useForm } from '@mantine/form'
import { FC } from 'react'

export type AuthState = 'login' | 'registration'

export const AuthForm: FC<{ mode: AuthState; switchMode: () => void }> = ({ mode, switchMode }) => {
    const auth = useAuthStore()

    const validateField = (value: string, field: string) => {
        if (mode === 'registration') {
            if (field === 'name' && value.length < 2) return 'Имя не может быть меньше 2 символов'
            if (field === 'email' && !/^\S+@\S+$/.test(value)) return 'Не валидная почта'
            if (field === 'login' && value.length < 5) return 'Логин не может быть меньше 5 символов'
            if (field === 'password' && value.length < 16) return 'Пароль не может быть меньше 16 символов'
        } else {
            if (field === 'login' && value.length < 1) return 'Логин не может быть пустой'
            if (field === 'password' && value.length < 1) return 'Пароль не может быть пустой'
        }
        return null
    }

    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', email: '', password: '', login: '', confirmPassword: '' },
        validate: {
            name: (value) => validateField(value, 'name'),
            email: (value) => validateField(value, 'email'),
            login: (value) => validateField(value, 'login'),
            password: (value) => validateField(value, 'password'),
            confirmPassword: (value, values) =>
                mode === 'registration' && value !== values.password ? 'Пароли не совпадают' : null,
        },
    })

    const { name, email, password, login } = form.getValues()
    const submit = () => {
        const user = { name, email, password, login }

        if (mode === 'registration') {
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
                {mode === 'login' ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'}
            </Title>
            <form onSubmit={form.onSubmit(submit)}>
                {mode === 'registration' && (
                    <TextInput
                        label='Введите ваше имя'
                        mt='10px'
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                )}
                <TextInput label='Введите ваш логин' key={form.key('login')} {...form.getInputProps('login')} />
                {mode === 'registration' && (
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
                {mode === 'registration' && (
                    <PasswordInput
                        label='Повторите ваш пароль'
                        mt='10px'
                        key={form.key('confirmPassword')}
                        {...form.getInputProps('confirmPassword')}
                    />
                )}
                <CustomButton w='100%' mt='10px' type='submit'>
                    {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </CustomButton>
            </form>
            <CustomButton onClick={toggleMode} w='100%' mt='10px' variant='outline'>
                {mode === 'login' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
            </CustomButton>
        </div>
    )
}

AuthForm.displayName = 'AuthForm'
