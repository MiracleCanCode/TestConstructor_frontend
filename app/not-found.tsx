import { CustomButton } from '@/components/ui'
import { Flex, Title } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import NotFoundImage from 'public/images/not-found.png'

const NotFound = () => (
	<Flex align='center' justify='center' h='80vh' direction='column'>
		<Image src={NotFoundImage} alt='not-found' width={400} height={400} />
		<Title tw='300'>У нас что-то сломалось, но это временно</Title>
		<Link href='/'>
			<CustomButton mt={10} variant='subtle'>
				Вернуться на главную
			</CustomButton>
		</Link>
	</Flex>
)

export default NotFound
