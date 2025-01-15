import { CreateTestForm } from '@/components/ui/create-test-form'
import { FC } from 'react'

const CreateTest: FC = () => (
    <div className=' mt-8'>
        <CreateTestForm />
    </div>
)

CreateTest.displayName = 'CreateTestPage'
export default CreateTest
