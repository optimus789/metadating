import { Button, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface DescriptionProps {
	description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
	const [showMore, setShowMore] = useState(false);

	const text =
		showMore || description.length <= 200
			? description
			: description.slice(0, 200).trim() + '...';

	return (
		<VStack w="full" pt={3} spacing={2} minH="80px">
			<Text
				fontSize="xl"
				fontWeight="semibold"
				color="pink.400"
				w="full"
				lineHeight={1}
			>
				About me
			</Text>
			<Text color="white" w="full">
				{text}
			</Text>
			{description.length > 200 && (
				<Button
					variant="link"
					colorScheme="cyan"
					onClick={() => setShowMore((prev) => !prev)}
				>
					{showMore ? 'Show less' : 'Show more'}
				</Button>
			)}
		</VStack>
	);
};

export default Description;
