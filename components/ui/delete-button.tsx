import { FC } from 'react'
import { CustomButton } from './custom-button'
import { FaTrash } from 'react-icons/fa'
import { ButtonProps } from '@mantine/core'

interface Props extends ButtonProps {
    children: string
}

export const DeleteButton: FC<Props> = ({ children, ...props }) => (
    <CustomButton leftSection={<FaTrash />} color='red' {...props}>
        {children}
    </CustomButton>
)

DeleteButton.displayName = 'DeleteButton'
