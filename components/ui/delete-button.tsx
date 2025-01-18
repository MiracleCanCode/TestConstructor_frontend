import { FC } from 'react'
import { CustomButton } from './custom-button'
import { FaTrash } from 'react-icons/fa'
import { ButtonProps } from '@mantine/core'

interface Props extends ButtonProps {
    children: string
    onClick?: () => void
}

export const DeleteButton: FC<Props> = ({ children, onClick, ...props }) => (
    <CustomButton leftSection={<FaTrash />} color='red' onClick={onClick} {...props}>
        {children}
    </CustomButton>
)

DeleteButton.displayName = 'DeleteButton'
