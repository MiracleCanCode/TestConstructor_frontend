'use client'
import { useGetTestById } from './stores/use-get-test-by-id'
import { useParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import { UserContentView } from './components/users-content-view'
import { AuthorContentView } from './components/author-content-view'
import { CustomLoader } from '@/components/ui/custom-loader'

const TestPage: FC = () => {
	const { getTestById, test, loading } = useGetTestById()
	const { id } = useParams()

	useEffect(() => {
		getTestById(Number(id))
	}, [id])

	if (loading && !test) {
		return <CustomLoader />
	}
	if (test.user_role === 'owner') {
		return <AuthorContentView test={test} />
	}

	return <UserContentView />
}

TestPage.displayName = 'TestPage'
export default TestPage
