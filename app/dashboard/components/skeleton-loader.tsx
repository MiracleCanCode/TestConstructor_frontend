import { Flex, Skeleton } from '@mantine/core'

export const SkeletonLoader = () => (
	<>
		<Skeleton w='1541px' height='20px' mt={50} />
		<div>
			<Flex gap={20} mt={10}>
				<Skeleton w='500px' height='100px' />
				<Skeleton w='500px' height='100px' />
				<Skeleton w='500px' height='100px' />
			</Flex>
		</div>
	</>
)
