import { useViewportSize } from '@mantine/hooks'
import { useEffect, useState } from 'react'

export const useIsMobileDevice = (breakpoint: number) => {
	const { width } = useViewportSize()
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		if (breakpoint >= width) {
			setIsMobile(true)
		}
	}, [width])

	return {
		isMobile
	}
}
