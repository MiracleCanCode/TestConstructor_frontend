import { TestForm } from './components/test-form'
import { FC } from 'react'

const CreateTest: FC = () => (
	<div className=' mt-8'>
		<TestForm />
	</div>
)

CreateTest.displayName = 'CreateTestPage'
export default CreateTest
