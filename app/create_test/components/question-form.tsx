'use client'

import { Divider, Flex, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useState, useMemo, useCallback } from 'react'
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

	const variantNumber = temporaryVariants.length + 1

	const addVariant = useCallback(
		(variant: Variant) => {
			setTemporaryVariants([...temporaryVariants, variant])
		},
		[temporaryVariants]
	)

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

	const submit = useCallback(() => {
		if (temporaryVariants.length < 2) {
			CustomErrorNotification('Количество вариантов для ответа не может быть меньше 2х!')
			return
		}
		const countIsCorrectVariants = temporaryVariants.filter(variant => variant.is_correct).length

		if (countIsCorrectVariants < 1) {
			CustomErrorNotification('Должен быть хотя бы один правильный вариант')
			return
		}

		createQuestion({
			name,
			description,
			variants: temporaryVariants
		})

		setTemporaryVariants([])
		form.reset()
	}, [temporaryVariants, name, description, createQuestion, form])

	const clear = useCallback(() => {
		setTemporaryVariants([])
		form.reset()
	}, [form])

	return (
		<div className={formSize}>
			<form onSubmit={form.onSubmit(submit)}>
				<TextInput label='Введите название вопроса' withAsterisk {...form.getInputProps('name')} />
				<Textarea label='Введите описание вопроса' />
				<Flex mt={20} gap={20}>
					<CustomButton type='submit'>Создать</CustomButton>
					<CustomButton color='red' variant='outline' onClick={clear}>
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
