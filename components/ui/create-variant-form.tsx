import { FC, useState } from 'react'
import { Variant } from '../stores/use-create-test-store'
import { useForm } from '@mantine/form'
import { Switch, TextInput, Text } from '@mantine/core'
import { CustomButton } from './custom-button'

export const CreateVariantForm: FC<{
    variantNumber: number
    save: (variant: Variant) => void
}> = ({ variantNumber, save }) => {
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            isCorrect: isCorrect
        },
        validate: {
            name: value => (value.length < 1 ? 'Имя не может быть пустым!' : null)
        }
    })

    const submit = () => {
        save({
            name: form.values.name,
            is_correct: form.values.isCorrect
        })
        setIsCorrect(false)
        form.reset()
    }

    return (
        <div className='mt-3'>
            <Text>Вариант {variantNumber}</Text>
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput label='Введите название варианта' {...form.getInputProps('name')} />
                <Switch
                    label='Правильный вариант'
                    color='green'
                    mt={10}
                    checked={isCorrect}
                    onChange={e => setIsCorrect(e.currentTarget.checked)}
                />
                <CustomButton mt={10} type='submit'>
                    Сохранить
                </CustomButton>
            </form>
        </div>
    )
}

CreateVariantForm.displayName = 'CreateVariantForm'
