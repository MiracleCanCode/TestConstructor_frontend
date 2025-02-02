import { DefaultMantineColor } from '@mantine/core'
import { notifications } from '@mantine/notifications'

export const Notification = (message: string, color?: DefaultMantineColor) =>
	notifications.show({
		title: 'Уведомление',
		message: message,
		color: color,
		position: 'bottom-right'
	})
