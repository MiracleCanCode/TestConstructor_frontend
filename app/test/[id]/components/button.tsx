import { CustomButton } from '@/components/ui'
import { ButtonVariant } from '@mantine/core'
import { FC } from 'react'

export const Button: FC<{ children: string; variant?: ButtonVariant; onClick?: () => void }> = ({
	children,
	variant,
	onClick
}) => (
	<CustomButton size='compact-sm' variant={variant} onClick={onClick}>
		{children}
	</CustomButton>
)

Button.displayName = 'GetTestByIdButton'
