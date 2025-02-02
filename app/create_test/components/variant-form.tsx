import { FC, useCallback } from 'react'
import { useForm } from '@mantine/form'
import { Switch, TextInput, Text } from '@mantine/core'
import { CustomButton } from '@/components/ui/custom-button'
import { Variant } from '@/components/helpers/interfaces/interface'

interface FormValues {
	name: string
	isCorrect: boolean
}

export const VariantForm: FC<{
	variantNumber: number
	save: (variant: Variant) => void
}> = ({ variantNumber, save }) => {
	const form = useForm<FormValues>({
		initialValues: {
			name: '',
			isCorrect: false
		},
		validate: {
			name: value => (value.length < 1 ? 'Имя не может быть пустым!' : null)
		}
	})

	const submit = useCallback(() => {
		save({
			name: form.values.name,
			is_correct: form.values.isCorrect
		})
		form.reset()
	}, [form, save])

	return (
		<div className='mt-3'>
			<Text>Вариант {variantNumber}</Text>
			<form onSubmit={form.onSubmit(submit)}>
				<TextInput label='Введите название варианта' required {...form.getInputProps('name')} />
				<Switch
					label='Правильный вариант'
					color='green'
					mt={10}
					checked={form.values.isCorrect}
					onChange={e => form.setFieldValue('isCorrect', e.currentTarget.checked)}
				/>
				<CustomButton mt={10} type='submit'>
					Сохранить
				</CustomButton>
			</form>
		</div>
	)
}

VariantForm.displayName = 'VariantForm'
