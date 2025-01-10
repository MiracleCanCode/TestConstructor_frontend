'use client'
import { Flex, Modal, Switch, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useState } from 'react'
import { token } from '../../../components/helpers/constants/token'
import { CreateQuestionForm } from './create-question-form'
import { CustomButton } from '../../../components/ui/custom-button'

export const CreateTestForm: FC = () => {
    const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState<boolean>(false)
    return (
        <Flex direction='column' justify='center' align='center'>
            <Flex direction='column'>
                <Text size='xl'>Настройки теста</Text>
                <div className=' w-700'>
                    <TextInput label='Введите название теста' withAsterisk />
                    <Textarea label='Введите описание' mt={10} />
                    {token && <Switch label='Анонимный тест' mt={20} />}
                    <CustomButton mt={20}>Создать тест</CustomButton>
                    <CustomButton mt={20} color='red' ml={20} variant='subtle'>
                        Стереть тест
                    </CustomButton>
                </div>
                <Text mt={50} size='xl'>
                    Вопросы теста
                </Text>
                <CustomButton mt={10} variant='outline' onClick={() => setOpenCreateQuestionModal(true)}>
                    Создать вопрос
                </CustomButton>
                <Modal
                    opened={openCreateQuestionModal}
                    onClose={() => setOpenCreateQuestionModal(false)}
                    title='Создание вопроса'
                >
                    <CreateQuestionForm questionNumber={1} />
                </Modal>
            </Flex>
        </Flex>
    )
}

CreateTestForm.displayName = 'CreateTestFormComponent'
