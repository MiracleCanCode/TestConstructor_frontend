import { Flex, Textarea, TextInput } from '@mantine/core'
import { FC } from 'react'

export const CreateTestForm: FC = () => {
    return (
        <Flex justify='center' direction='column' align='center'>
            <div className=' w-700'>
                <TextInput label='Введите название теста' withAsterisk />
                <Textarea label='Введите описание' />
            </div>
            <div></div>
        </Flex>
    )
}

CreateTestForm.displayName = 'CreateTestFormComponent'
