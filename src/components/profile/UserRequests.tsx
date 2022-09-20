import { VStack, Text } from '@chakra-ui/react';
import { request } from '../../utils/types';
import RequestCard from './RequestCard';

interface UserRequestsProps {
	requests: request[];
}

const UserRequests: React.FC<UserRequestsProps> = ({ requests }) => {
	return (
		<VStack w="full" pt={12}>
			<Text w="full" color="pink.400" fontSize="2xl" fontWeight="semibold">
				Requests
			</Text>
			{requests.length === 0 && (
				<Text color="white" fontWeight="semibold" fontSize="2xl">
					You currently don&apos;t have any request
				</Text>
			)}
			<VStack py={3} spacing={4} w="full">
				{requests.map((request, index) => {
					return <RequestCard {...request} key={index} />;
				})}
			</VStack>
		</VStack>
	);
};

export default UserRequests;
