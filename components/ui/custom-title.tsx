import { Title, TitleProps } from '@mantine/core'
import { FC, memo } from 'react'

type Props = TitleProps

export const CustomTitle: FC<Props> = memo(({ children, ...props }) => <Title {...props}>{children}</Title>)

CustomTitle.displayName = 'CustomTitleComponent'
