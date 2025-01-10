import { CreateTestForm } from '@/app/create_test/components/create-test-form'
import { FC } from 'react'

const CreateTest: FC = () => (
    <div className=' mt-8'>
        <CreateTestForm />
    </div>
)

CreateTest.displayName = 'CreateTestPage'
export default CreateTest
