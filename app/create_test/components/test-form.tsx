'use client'

import { Flex, Group, Modal, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useMemo, useState, useCallback, memo } from 'react'
import { CustomButton } from '@/components/ui/custom-button'
import { useForm } from '@mantine/form'
import { CustomErrorNotification } from '@/components/helpers/custom-notification-error'
import { QuestionForm } from './question-form'
import { useCreateTestStore } from '../stores/use-create-test-store'
import { QuestionCard } from './question-card'
import { useViewportSize } from '@mantine/hooks'
import { FaPlusCircle } from 'react-icons/fa'
import { DeleteButton } from '@/components/ui/delete-button'

export const TestForm: FC = memo(() => {
	const { test, createTest, clearTest, deleteQuestion } = useCreateTestStore()
	const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState<boolean>(false)

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

	const isCreateTestButtonDisabled = useMemo(() => {
		return test.questions?.length < 2 || !form.values.name
	}, [test.questions, form.values.name])

	const { width } = useViewportSize()
	const formSize = useMemo(() => (width <= 800 ? 'w-full' : 'w-700'), [width])

	const { name, description } = form.getValues()

	const handleSubmit = useCallback(() => {
		if (test.questions?.length < 2) {
			CustomErrorNotification('Количество вопросов не может быть меньше 2х!')
			return
		}

		createTest({
			name,
			description,
			questions: test.questions
		})
		clearTest()
		form.reset()
	}, [test.questions, createTest, name, description, clearTest, form])

	const clear = useCallback(() => {
		clearTest()
		form.reset()
	}, [clearTest, form])

	return (
		<Flex direction='column' justify='center' align='center' wrap='wrap'>
			<Flex direction='column' wrap='wrap'>
				<Text size='xl'>Настройки теста</Text>

				<div className={formSize}>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput label='Введите название теста' withAsterisk {...form.getInputProps('name')} />
						<Textarea label='Введите описание' mt={10} {...form.getInputProps('description')} />

						<Group>
							<CustomButton
								leftSection={<FaPlusCircle />}
								mt={20}
								type='submit'
								disabled={isCreateTestButtonDisabled}
							>
								Создать тест
							</CustomButton>
							<DeleteButton
								onClick={clear}
								mt={20}
								variant='outline'
								disabled={isCreateTestButtonDisabled}
							>
								Стереть тест
							</DeleteButton>
						</Group>
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
							<QuestionCard
								deleteAction={() => deleteQuestion(question)}
								name={question.name}
								questionIndex={idx + 1}
								variants={question.variants}
							/>
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
})

TestForm.displayName = 'TestForm'
