import { FC } from 'react'
import { CustomButton } from './custom-button'
import { FaRegTrashCan } from 'react-icons/fa6'
import { ButtonProps } from '@mantine/core'

interface Props extends ButtonProps {
    children: string
    onClick?: () => void
}

export const DeleteButton: FC<Props> = ({ children, onClick, ...props }) => (
    <CustomButton leftSection={<FaRegTrashCan />} color='red' onClick={onClick} {...props}>
        {children}
    </CustomButton>
)

DeleteButton.displayName = 'DeleteButton'
