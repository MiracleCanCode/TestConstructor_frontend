'use client'

import { Divider, Flex, Switch, Text, Textarea, TextInput } from '@mantine/core'
import { FC, useMemo, useState } from 'react'
import { CustomButton } from '@/components/ui/custom-button'
import { useCreateTestStore } from '@/components/stores/use-create-test-store'
import { VariantEntity } from './entities/variant-entity'
import { useForm } from '@mantine/form'

interface Variant {
    name: string
    isCorrect: boolean
}

const CreateVariantForm: FC<{
    variantNumber: number
    save: (variant: Variant) => void
}> = ({ variantNumber, save }) => {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            isCorrect: false,
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Имя не может быть пустым!' : null),
        },
    })

    const submit = () => {
        save({
            name: form.values.name,
            isCorrect: form.values.isCorrect,
        })
        form.reset()
    }

    return (
        <div className='mt-3'>
            <Text>Вариант {variantNumber}</Text>
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput label='Введите название варианта' {...form.getInputProps('name')} />
                <Switch label='Правильный вариант' color='green' mt={10} {...form.getInputProps('isCorrect')} />
                <CustomButton mt={10} type='submit'>
                    Сохранить
                </CustomButton>
            </form>
        </div>
    )
}

export const CreateQuestionForm: FC = () => {
    const { createQuestion } = useCreateTestStore()

    const [temporaryVariants, setTemporaryVariants] = useState<Variant[]>([])
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            description: '',
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Имя не может быть пустым!' : null),
        },
    })

    const variantNumber = useMemo(() => {
        return temporaryVariants.length + 1
    }, [temporaryVariants])

    const addVariant = (variant: Variant) => {
        setTemporaryVariants([...temporaryVariants, variant])
    }

    const { name, description } = form.getValues()

    const submit = () => {
        console.log()
        createQuestion({
            name: name,
            description: description,
            variants: temporaryVariants,
        })
        form.reset()
    }

    return (
        <div className='w-96'>
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
            <Text mt={20}>Варианты ответа</Text>
            {temporaryVariants.length >= 1 &&
                temporaryVariants.map((v, index) => (
                    <VariantEntity key={index} name={v.name} isCorrect={v.isCorrect} index={index + 1} />
                ))}

            <CreateVariantForm variantNumber={variantNumber} save={addVariant} />
        </div>
    )
}

CreateQuestionForm.displayName = 'CreateQuestionForm'
