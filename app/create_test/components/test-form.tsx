'use client'

import { Flex, Modal, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useMemo, useState } from 'react'

import { CustomButton } from '@/components/ui/custom-button'

import { useForm } from '@mantine/form'
import { CustomErrorNotification } from '@/components/helpers/custom-notification-error'
import { QuestionForm } from './question-form'
import { useCreateTestStore } from '../stores/use-create-test-store'
import { QuestionEntity } from './question-entity'
import { useViewportSize } from '@mantine/hooks'
import { useGetToken } from '@/components/hooks/use-get-token'

export const TestForm: FC = () => {
	const { test, createTest, clearTest } = useCreateTestStore()
	const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState<boolean>(false)
	const isCreateTestButtonDisabled = test.questions?.length < 2
	const { width } = useViewportSize()
	const formSize = useMemo(() => (width <= 800 ? 'w-full' : 'w-700'), [width])
	const { token } = useGetToken()

	const form = useForm({
		mode: 'controlled',
		initialValues: {
			name: '',
			description: ''
		},
		validate: {
			name: value => (value.length < 1 ? 'Имя теста не может быть пустым!' : null)
		}
	})

	const { name, description } = form.getValues()

	const handleSubmit = () => {
		if (test.questions?.length < 2) {
			CustomErrorNotification('Количество вопросов не может быть меньше 2х!')
			return
		}

		createTest(
			{
				name,
				description,
				questions: test.questions
			},
			token || ''
		)

		form.reset()
	}

	const clear = () => {
		clearTest()
		form.reset()
	}

	return (
		<Flex direction='column' justify='center' align='center' wrap='wrap'>
			<Flex direction='column' wrap='wrap'>
				<Text size='xl'>Настройки теста</Text>

				<div className={formSize}>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput label='Введите название теста' withAsterisk {...form.getInputProps('name')} />

						<Textarea label='Введите описание' mt={10} {...form.getInputProps('description')} />

						<CustomButton mt={20} type='submit' disabled={isCreateTestButtonDisabled}>
							Создать тест
						</CustomButton>

						<CustomButton ml={20} mt={20} type='button' variant='subtle'>
							Сохранить тест
						</CustomButton>

						<CustomButton mt={20} color='red' ml={20} variant='subtle' onClick={clear}>
							Стереть тест
						</CustomButton>
					</form>
				</div>

				<Text mt={50} size='xl'>
					Вопросы теста
				</Text>

				<CustomButton variant='outline' onClick={() => setOpenCreateQuestionModal(true)}>
					Создать вопрос
				</CustomButton>
				{Array.isArray(test.questions) &&
					test.questions.length > 0 &&
					test.questions.map((question, idx) => (
						<div key={idx} className='mt-3'>
							<QuestionEntity name={question.name} questionIndex={idx + 1} variants={question.variants} />
						</div>
					))}

				<Modal
					opened={openCreateQuestionModal}
					onClose={() => setOpenCreateQuestionModal(false)}
					title='Создание вопроса'
				>
					<QuestionForm />
				</Modal>
			</Flex>
		</Flex>
	)
}

TestForm.displayName = 'TestForm'
