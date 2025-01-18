'use client'
import { useGetTestById } from '@/components/stores/use-get-test-by-id'
import { useParams } from 'next/navigation'
import { FC, useEffect } from 'react'

const TestPage: FC = () => {
    const { getTestById, test } = useGetTestById()
    const id = useParams().id

    useEffect(() => {
        getTestById(Number(id))
    }, [id])
    return <div>{test.name}</div>
}

TestPage.displayName = 'TestPage'
export default TestPage
