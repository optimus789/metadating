import { Box, HStack, VStack, Text, Button, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import Image from 'next/image';
import { request } from '../../utils/types';

type RequestCardProps = request;

const RequestCard: React.FC<RequestCardProps> = ({ createdAt, from }) => {
	const handleAccept = () => {
		console.log('accept');
	};

	const handleDecline = () => {
		console.log('decline');
	};

	return (
		<Stack
			px={4}
			py={3}
			rounded="xl"
			bgColor="gray.700"
			minW={{ base: 350, md: 450, lg: 550 }}
			justifyContent="space-between"
			direction={{ base: 'column', md: 'column', lg: 'row' }}
		>
			<HStack spacing={3}>
				<Box
					rounded="full"
					borderColor={from.sex === 'male' ? 'cyan.400' : 'pink.400'}
					borderWidth={2}
					width={16}
					height={16}
					pos="relative"
				>
					<Image
						src={from.profilePic}
						alt="User img"
						layout="fill"
						className="rounded-full"
					/>
				</Box>
				<VStack spacing={1}>
					<Text fontSize="2xl" color="white" w="full" textAlign="left">
						{from.name}
					</Text>
					<Text
						color={from.sex === 'male' ? 'cyan.400' : 'pink.400'}
						w="full"
						textAlign="right"
					>
						{from.sex}, {from.age}
					</Text>
				</VStack>
			</HStack>
			<VStack justifyContent="center">
				<Text color="white">
					{from.city}, {from.country}
				</Text>
				<Text color="white">Sent on: {format(createdAt, 'dd.MM.yyyy')}</Text>
			</VStack>
			<HStack>
				<Button colorScheme="green" onClick={handleAccept}>
					Accept
				</Button>
				<Button colorScheme="red" onClick={handleDecline}>
					Decline
				</Button>
			</HStack>
		</Stack>
	);
};

export default RequestCard;
