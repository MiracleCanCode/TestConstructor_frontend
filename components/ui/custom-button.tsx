import { Button, ButtonProps } from '@mantine/core'
import { FC } from 'react'

interface Props extends ButtonProps {
    onClick?: () => void
    type?: 'submit' | 'button'
}

export const CustomButton: FC<Props> = ({ children, color, onClick, type = 'button', ...props }) => (
    <Button color={color?.length ? color : 'indigo'} type={type} onClick={onClick} {...props}>
        {children}
    </Button>
)

CustomButton.displayName = 'CustomButtonComponent'
