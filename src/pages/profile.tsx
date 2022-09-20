import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useMetaMask } from 'metamask-react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ProfileDetails from '../components/profile/ProfileDetails';
import UserRequests from '../components/profile/UserRequests';
import MetamaskNav from '../components/utils/MetamaskNav';
import { mockUsers } from '../utils/mock-data';
import { userProfile } from '../utils/types';

const ProfilePage: NextPage = () => {
	const [user, setUser] = useState<userProfile | null>(null);

	//fetch user here - dont have to be useEffect, perfectly react-query or something like this
	useEffect(() => {
		const randomUser: userProfile = {
			...mockUsers[Math.floor(Math.random() * mockUsers.length)]!,
			requests: [],
		};

		console.log(mockUsers[1]);

		const userRequesting1 =
			mockUsers[Math.floor(Math.random() * mockUsers.length)]!;
		const userRequesting2 =
			mockUsers[Math.floor(Math.random() * mockUsers.length)]!;
		const userRequesting3 =
			mockUsers[Math.floor(Math.random() * mockUsers.length)]!;

		randomUser.requests!.push({
			from: userRequesting1,
			createdAt: new Date('2021-07-07'),
		});
		randomUser.requests!.push({
			from: userRequesting2,
			createdAt: new Date('2022-07-07'),
		});
		randomUser.requests!.push({
			from: userRequesting3,
			createdAt: new Date('2022-06-06'),
		});

		setUser(randomUser);
	}, []);

	const { status } = useMetaMask();

	const isConnected = status === 'connected';

	return (
		<VStack
			minH="100vh"
			bgColor="blackAlpha.900"
			pt={14}
			spacing={7}
			justifyContent={isConnected && user ? 'flex-start' : 'center'}
		>
			<HStack pos="fixed" top={0} left={0} right={0} justifyContent="flex-end">
				<Box mt={6} mr={6}>
					<MetamaskNav />
				</Box>
			</HStack>
			<VStack w={{ base: 330, md: 450, lg: 470 }}>
				{!isConnected && (
					<Text fontWeight="semibold" fontSize="3xl" color="pink.400">
						Connect wallet to see your profile
					</Text>
				)}
				{isConnected && !user && (
					<Text fontWeight="semibold" fontSize="3xl" color="pink.400">
						Loading profile...
					</Text>
				)}
				{user && isConnected && <ProfileDetails user={user} />}
				{user && isConnected && <UserRequests requests={user.requests} />}
			</VStack>
		</VStack>
	);
};

export default ProfilePage;
