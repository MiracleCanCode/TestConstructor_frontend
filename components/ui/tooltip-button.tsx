import { ButtonProps, Tooltip } from '@mantine/core'
import { FC } from 'react'
import { CustomButton } from './custom-button'

interface Props extends ButtonProps {
	tooltipText: string
}

export const TooltipCustomButton: FC<Props> = ({ children, tooltipText, ...props }) => (
	<Tooltip label={tooltipText}>
		<CustomButton {...props}>{children}</CustomButton>
	</Tooltip>
)

TooltipCustomButton.displayName = 'TooltipCustomButton'
