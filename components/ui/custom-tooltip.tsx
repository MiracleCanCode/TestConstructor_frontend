import { Tooltip, TooltipProps } from '@mantine/core'
import { FC } from 'react'

type Props = TooltipProps

export const CustomTooltip: FC<Props> = ({ label, children, ...props }) => (
	<Tooltip label={label} withArrow openDelay={500} events={{ hover: true, focus: true, touch: true }} {...props}>
		{children}
	</Tooltip>
)

CustomTooltip.displayName = 'CustomTooltip'
