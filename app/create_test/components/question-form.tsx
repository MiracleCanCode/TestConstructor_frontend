'use client'

import { Divider, Flex, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useMemo, useState } from 'react'
import { CustomButton } from '@/components/ui/custom-button'
import { VariantCard } from '@/components/ui/variant-card'
import { useForm } from '@mantine/form'
import { CustomErrorNotification } from '@/components/helpers/custom-notification-error'
import { VariantForm } from './variant-form'
import { useCreateTestStore } from '../stores/use-create-test-store'
import { Variant } from '@/components/helpers/interfaces/interface'
import { useViewportSize } from '@mantine/hooks'

export const QuestionForm: FC = () => {
	const { createQuestion } = useCreateTestStore()

	const [temporaryVariants, setTemporaryVariants] = useState<Variant[]>([])
	const { width } = useViewportSize()
	const formSize = useMemo(() => (width <= 1200 ? 'w-full' : 'w-96'), [width])

	const variantNumber = useMemo(() => {
		return temporaryVariants.length + 1
	}, [temporaryVariants])

	const addVariant = (variant: Variant) => {
		setTemporaryVariants([...temporaryVariants, variant])
	}
	const form = useForm({
		mode: 'controlled',
		initialValues: {
			name: '',
			description: ''
		},
		validate: {
			name: value => (value.length < 1 ? 'Имя не может быть пустым!' : null)
		}
	})

	const { name, description } = form.getValues()

	const submit = () => {
		if (temporaryVariants.length < 2) {
			CustomErrorNotification('Количество вариантов для ответа не может быть меньше 2х!')
			return
		}
		let countIsCorrectVariants = 0
		temporaryVariants.map(variant => (variant.is_correct === true ? countIsCorrectVariants++ : null))

		if (countIsCorrectVariants < 1) {
			CustomErrorNotification('Должен быть хотя бы один правильный вариант')
			return
		}

		createQuestion({
			name: name,
			description: description,
			variants: temporaryVariants
		})
		setTemporaryVariants([])
		form.reset()
	}

	return (
		<div className={formSize}>
			<form onSubmit={form.onSubmit(submit)}>
				<TextInput label='Введите название вопроса' withAsterisk {...form.getInputProps('name')} />
				<Textarea label='Введите описание вопроса' {...form.getInputProps('description')} />
				<Flex mt={20} gap={20}>
					<CustomButton type='submit'>Создать</CustomButton>
					<CustomButton color='red' variant='outline'>
						Очистить
					</CustomButton>
				</Flex>
			</form>
			<Divider mt={20} />
			<VariantForm variantNumber={variantNumber} save={addVariant} />
			{temporaryVariants.length >= 1 && <Text mt={20}>Варианты ответа</Text>}
			{temporaryVariants.length >= 1 &&
				temporaryVariants.map((v, idx) => (
					<div key={idx} className=' mb-3'>
						<VariantCard name={v.name} isCorrect={v.is_correct} index={idx + 1} />
					</div>
				))}
		</div>
	)
}

QuestionForm.displayName = 'QuestionForm'
