import { CustomButton } from '@/components/ui'
import { Flex, Title } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

const Welcome: FC = () => (
    <Flex justify='center' align='center' h='100vh' direction='column'>
        <Title order={2} mb='30px'>
            Будущее тестирования начинается здесь — быстро, точно, без ограничений!
        </Title>
        <Flex gap='sm'>
            <Link href='/create_test'>
                <CustomButton variant='outline' w='300px'>
                    Создать тест
                </CustomButton>
            </Link>
            <Link href='/auth'>
                <CustomButton variant='filled' w='300px'>
                    Войти или зарегистрироваться
                </CustomButton>
            </Link>
        </Flex>
    </Flex>
)

Welcome.displayName = 'WelcomePage'
export default Welcome
