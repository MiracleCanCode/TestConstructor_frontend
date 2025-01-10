'use client'

import { Divider, Flex, Switch, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useMemo, useState } from 'react'
import { CustomButton } from '@/components/ui/custom-button'
import { useCreateTestStore } from '@/components/stores/use-create-test-store'

interface Props {
    questionNumber?: number
}

interface Variant {
    name: string
    isCorrect: boolean
}

const CreateVariantForm: FC<{
    variantNumber: number
    save: (variant: Variant) => void
}> = ({ variantNumber, save }) => {
    const [data, setData] = useState<Variant>({
        name: '',
        isCorrect: false,
    })

    const submit = () => {
        save(data)
    }
    return (
        <div className='mt-3'>
            <Text>Вариант {variantNumber}</Text>
            <form>
                <TextInput
                    label='Введите название варианта'
                    onChange={(e) =>
                        setData({
                            ...data,
                            name: e.currentTarget.value,
                        })
                    }
                />
                <Switch
                    label='Правильный вариант'
                    color='green'
                    mt={10}
                    onChange={(e) =>
                        setData({
                            ...data,
                            isCorrect: e.currentTarget.checked,
                        })
                    }
                />
                <CustomButton mt={10} type='button' onClick={submit}>
                    Сохранить
                </CustomButton>
            </form>
        </div>
    )
}

export const CreateQuestionForm: FC<Props> = ({ questionNumber }) => {
    const { test, createQuestion, addVariantToQuestion } = useCreateTestStore()

    const variantNumber = useMemo(() => {
        const currentQuestion = test.questions[questionNumber ?? 0]
        return currentQuestion ? currentQuestion.variantAnswer.length + 1 : 1
    }, [test.questions, questionNumber])

    const [name, setName] = useState<string>('')
    const addVariant = (variant: Variant) => {
        if (questionNumber !== undefined) {
            addVariantToQuestion(variant, questionNumber)
        }
    }

    return (
        <div className='w-96'>
            <Text>Вопрос {questionNumber}</Text>
            <TextInput label='Введите название вопроса' withAsterisk onChange={(e) => setName(e.currentTarget.value)} />
            <Textarea label='Введите описание вопроса' />
            <Text mt={20}>Варианты ответа</Text>

            <CreateVariantForm variantNumber={variantNumber} save={addVariant} />

            <Divider mt={20} />
            <Flex mt={20} gap={20}>
                <CustomButton
                    onClick={() =>
                        createQuestion({
                            name: name,
                            variantAnswer: [],
                        })
                    }
                >
                    Создать вопрос
                </CustomButton>
                <CustomButton color='red' variant='outline'>
                    Очистить
                </CustomButton>
            </Flex>
        </div>
    )
}

CreateQuestionForm.displayName = 'CreateQuestionForm'
