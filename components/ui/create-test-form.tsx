'use client'

import { Flex, Modal, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useState } from 'react'
import { CreateQuestionForm } from './create-question-form'
import { CustomButton } from './custom-button'
import { useCreateTestStore } from '@/components/stores/use-create-test-store'
import { QuestionEntity } from './entities/qustion-entity'
import { useForm } from '@mantine/form'

export const CreateTestForm: FC = () => {
    const { test, createTest } = useCreateTestStore()
    const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState<boolean>(false)

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            description: '',
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Имя теста не может быть пустым!' : null),
        },
    })

    const { name, description } = form.getValues()

    const submit = () => {
        createTest({
            name: name,
            description: description,
            questions: test.questions,
        })
        form.reset()
    }

    return (
        <Flex direction='column' justify='center' align='center'>
            <Flex direction='column'>
                <Text size='xl'>Настройки теста</Text>
                <div className='w-700'>
                    <form onSubmit={form.onSubmit(submit)}>
                        <TextInput label='Введите название теста' withAsterisk {...form.getInputProps('name')} />

                        <Textarea label='Введите описание' mt={10} {...form.getInputProps('description')} />
                        <CustomButton mt={20} type='submit'>
                            Создать тест
                        </CustomButton>
                        <CustomButton mt={20} color='red' ml={20} variant='subtle'>
                            Стереть тест
                        </CustomButton>
                    </form>
                </div>

                <Text mt={50} size='xl'>
                    Вопросы теста
                </Text>

                {Array.isArray(test.questions) &&
                    test.questions.length > 0 &&
                    test.questions.map((question, idx) => (
                        <div key={idx} className='mb-3'>
                            <QuestionEntity name={question.name} questionIndex={idx + 1} variants={question.variants} />
                        </div>
                    ))}

                <CustomButton mt={10} variant='outline' onClick={() => setOpenCreateQuestionModal(true)}>
                    Создать вопрос
                </CustomButton>

                <Modal
                    opened={openCreateQuestionModal}
                    onClose={() => setOpenCreateQuestionModal(false)}
                    title='Создание вопроса'
                >
                    <CreateQuestionForm />
                </Modal>
            </Flex>
        </Flex>
    )
}
