'use client'
import { useGetTestById } from './stores/use-get-test-by-id'
import { useParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import { ForUsers } from './components/for-users'
import { ForCreator } from './components/for-creator'
import { CustomLoader } from '@/components/ui/custom-loader'

const TestPage: FC = () => {
	const { getTestById, test, loading } = useGetTestById()
	const { id } = useParams()

	useEffect(() => {
		getTestById(Number(id))
	}, [getTestById, id])

	if (loading) {
		return <CustomLoader />
	}
	if (test.user_role === 'owner') {
		return <ForCreator test={test} />
	}

	return <ForUsers />
}

TestPage.displayName = 'TestPage'
export default TestPage
