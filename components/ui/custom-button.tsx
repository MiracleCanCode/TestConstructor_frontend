import { Button, ButtonProps } from '@mantine/core'
import { FC, memo } from 'react'

interface Props extends ButtonProps {
	onClick?: () => void
	type?: 'submit' | 'button'
}

export const CustomButton: FC<Props> = memo(({ children, color, onClick, type = 'button', ...props }) => (
	<Button color={color?.length ? color : 'indigo'} type={type} onClick={onClick} {...props}>
		{children}
	</Button>
))

CustomButton.displayName = 'CustomButtonComponent'
