import { CustomButton } from '@/components/ui'
import { PasswordInput, TextInput, Title } from '@mantine/core'
import { useAuthStore } from '../stores/use-auth-store'
import { useForm } from '@mantine/form'
import { FC } from 'react'
import Link from 'next/link'

export type AuthState = 'login' | 'registration'

export const AuthForm: FC<{ mode: AuthState; switchMode: () => void }> = ({ mode, switchMode }) => {
    const registration = useAuthStore().registration
    const auth = useAuthStore().auth

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', email: '', password: '', login: '', confirmPassword: '' },
        validate: {
            name: (value) =>
                mode === 'registration' && value.length < 2 ? 'Имя не может быть меньше 2 символов' : null,
            email: (value) => (mode === 'registration' && !/^\S+@\S+$/.test(value) ? 'Не валидная почта' : null),
            login: (value) =>
                mode === 'registration'
                    ? value.length < 5
                        ? 'Логин не может быть меньше 5 символов'
                        : null
                    : value.length < 1
                      ? 'Логин не может быть пустой'
                      : null,
            password: (value) =>
                mode === 'registration'
                    ? value.length < 16
                        ? 'Пароль не может быть меньше 16 символов'
                        : null
                    : value.length < 1
                      ? 'Пароль не может быть пустой'
                      : null,
            confirmPassword: (value, values) =>
                mode === 'registration' && value != values.password ? 'Пароли не совпадают' : null,
        },
    })

    const { name, email, password, login } = form.getValues()
    const submit = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            login: login,
        }
        if (mode === 'registration') {
            return registration(user)
        }

        return auth(user)
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
            <Link href='/'>
                <CustomButton w='100%' mt='10px' variant='outline'>
                    На главную
                </CustomButton>
            </Link>
        </div>
    )
}

AuthForm.displayName = 'AuthForm'
