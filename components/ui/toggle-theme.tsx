import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useMemo } from 'react'
import { CustomTooltip } from './custom-tooltip'
import { FiMoon, FiSun } from 'react-icons/fi'

export const ToggleTheme = () => {
	const { setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true
	})

	const iconColor = useMemo(() => (computedColorScheme === 'light' ? 'black' : 'white'), [computedColorScheme])
	const labelForChangeTheme = useMemo(
		() => (computedColorScheme === 'light' ? 'Сменить тему на темную' : 'Сменить тему на светлую'),
		[computedColorScheme]
	)
	return (
		<CustomTooltip label={labelForChangeTheme}>
			<ActionIcon
				onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
				variant='transparent'
				color={iconColor}
				size='xl'
			>
				{computedColorScheme === 'light' ? <FiSun size='20' /> : <FiMoon size='20' />}
			</ActionIcon>
		</CustomTooltip>
	)
}
