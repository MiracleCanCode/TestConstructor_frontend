'use client'
import { useGetTestById } from '@/components/stores/use-get-test-by-id'
import { CustomButton } from '@/components/ui'
import { CustomLoader } from '@/components/ui/custom-loader'
import { VariantEntity } from '@/components/ui/entities/variant-entity'
import { Container, Flex, Title, Divider } from '@mantine/core'
import { useParams } from 'next/navigation'
import { FC, useEffect } from 'react'

const TestPage: FC = () => {
    const { getTestById, test, loading } = useGetTestById()
    const { id } = useParams()

    useEffect(() => {
        getTestById(Number(id))
    }, [id])

    if (loading) {
        return <CustomLoader />
    }
    return (
        <Container>
            <Flex align='center' mt='60px'>
                <Title>{test.name}</Title>
            </Flex>
            <div className=' mt-8'>
                {test.questions?.map((item, idx) => (
                    <div key={idx} className=' mb-6'>
                        <Divider label={item.name} mb={20} />

                        {item.variants?.map((variant, idx) => (
                            <div key={idx} className=' mb-3'>
                                <VariantEntity name={variant.name} index={idx + 1} solve />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <CustomButton variant='outline' mb={20}>
                Завершить и получить результат
            </CustomButton>
        </Container>
    )
}

TestPage.displayName = 'TestPage'
export default TestPage
