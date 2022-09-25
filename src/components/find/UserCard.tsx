import { Box, HStack, Text, VStack, chakra, Button } from '@chakra-ui/react';
import { useMetaMask } from 'metamask-react';
import Image from 'next/image';
import { useState } from 'react';
import { user } from '../../utils/types';
import { checkSentRequest, sendRequest } from '../utils/utils';
import { sendMessageXmtp } from '../utils/xmtpHelper';
import Description from './Description';
import FavNfts from './FavNfts';

type UserCardProps = user;

const UserCard: React.FC<UserCardProps> = (user) => {
	//in real app you will get this info from api after doing the call
	const [requestSent, setRequestSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [reqMsg, setReqMsg] = useState('Send Request');
	const { account } = useMetaMask();

	const handleUserCardClick = async () => {
		try {
			setLoading(true);
			const [status, requesteeAddr]: [string, string] = await checkSentRequest(
				user.tokenId,
				account ? account.toLowerCase() : ''
			);

			if (!status?.length) {
				const xmtpConnect = user.xmtp;
				const senderAddr = account || '';
				const messageXmtp = await sendMessageXmtp(
					xmtpConnect,
					user,
					senderAddr,
					requesteeAddr
				);
				if (messageXmtp) {
					const requestSent = await sendRequest(
						requesteeAddr,
						senderAddr,
						'requested',
						false
					);
					console.log(requestSent);
				}
				setReqMsg('Request sent');
			} else if (status === 'requested') {
				setReqMsg('Request Already Sent');
			} else if (status === 'accepted') {
				setReqMsg('Request Accepted, Go to Profile Page');
			} else if (status === 'declined') {
				setReqMsg('User Declined Request');
			}

			console.log('status', requesteeAddr, status);

			setRequestSent(true); // revert this back to true before git push
			setLoading(false);
		} catch (error) {
			setLoading(true);
			setRequestSent(false);
		}
	};

	return (
		<VStack w={300} px={6} py={5} bgColor="gray.700" rounded="xl">
			<HStack w="full" justifyContent="space-between">
				<Box
					rounded="full"
					borderColor="pink.400"
					borderWidth={2}
					width={20}
					height={20}
					pos="relative"
				>
					<Image
						src={user.profilePic}
						alt="User img"
						layout="fill"
						className="rounded-full"
					/>
				</Box>
				<VStack justifyContent="space-between" pr={8} spacing={1}>
					<Text fontSize="2xl" color="pink.400">
						{user.name}
					</Text>
					<Text color="white">
						Age: <chakra.span color="cyan.400">{user.age}</chakra.span>
					</Text>
					<Text color="white">
						Sex:{' '}
						<chakra.span color={user.sex === 'male' ? 'cyan.400' : 'pink.400'}>
							{user.sex}
						</chakra.span>
					</Text>
				</VStack>
			</HStack>
			<HStack w="full" justifyContent="space-between">
				<Text color="white">
					Country: <chakra.span color="cyan.400">{user.country}</chakra.span>
				</Text>
				<Text color="white">
					City: <chakra.span color="cyan.400">{user.city}</chakra.span>
				</Text>
			</HStack>
			<Description description={user.description} />
			<FavNfts
				nft1Img={user.nft1Img}
				nft2Img={user.nft2Img}
				nft3Img={user.nft3Img}
			/>
			<Box pt={5}>
				<Button
					colorScheme="green"
					isLoading={loading}
					onClick={handleUserCardClick}
					disabled={requestSent}
				>
					{reqMsg}
				</Button>
			</Box>
		</VStack>
	);
};

export default UserCard;
