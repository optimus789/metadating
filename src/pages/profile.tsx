/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Client from '@xmtp/xmtp-js/dist/types/Client';
import { useMetaMask } from 'metamask-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileDetails from '../components/profile/ProfileDetails';
import UserRequests from '../components/profile/UserRequests';
import MetamaskNav from '../components/utils/MetamaskNav';
import {
	getExternalMetadata,
	getTablelandRequests,
	getTokenOfOwner,
} from '../components/utils/utils';
import { getXmtpClient } from '../components/utils/xmtpHelper';
// import { mockUsers } from '../utils/mock-data';
import { userProfile } from '../utils/types';

const ProfilePage: NextPage = () => {
	const [userProfile, setUserProfile] = useState<userProfile | null>(null);
	const [flag, setFlag] = useState(true);
	const router = useRouter();

	//fetch user here - dont have to be useEffect, perfectly react-query or something like this
	useEffect(() => {
		async function setUserObj() {
			const xmtp: Client | boolean = await getXmtpClient(window);
			if (xmtp) {
				const address = xmtp ? xmtp.address : '';
				const contractAddr = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
				const tokenId = await getTokenOfOwner(address);
				if (tokenId === '') {
					router.push('/');
				}
				const userMetadata = await getExternalMetadata(
					tokenId,
					contractAddr,
					xmtp
				);
				if (userMetadata) {
					const userObj: userProfile = {
						...userMetadata,
						requests: [],
					};

					const userRequests = await getTablelandRequests(address);
					if (userRequests.length) {
						for (let i = 0; i < userRequests.length; i++) {
							const request = userRequests[i];
							const requesteeAddress = request[0].split('req')[1];
							const tokenId = await getTokenOfOwner(requesteeAddress);
							const requesteeMetadata = await getExternalMetadata(
								tokenId,
								'',
								xmtp
							);
							if (requesteeMetadata) {
								userObj.requests?.push({ from: requesteeMetadata });
							}
						}
					}

					setUserProfile(userObj);
				}
			}
		}
		if (flag) {
			setUserObj();
			setFlag(false);
		}
	}, []);

	const { status } = useMetaMask();

	const isConnected = status === 'connected';

	return (
		<VStack
			minH="100vh"
			bgColor="blackAlpha.900"
			pt={14}
			spacing={7}
			justifyContent={isConnected && userProfile ? 'flex-start' : 'center'}
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
				{isConnected && !userProfile && (
					<Text fontWeight="semibold" fontSize="3xl" color="pink.400">
						Please sign the XMTP messages from metamask, Loading profile...
					</Text>
				)}
				{userProfile && isConnected && <ProfileDetails user={userProfile} />}
				{userProfile && isConnected && (
					<UserRequests requests={userProfile.requests} />
				)}
			</VStack>
		</VStack>
	);
};

export default ProfilePage;
