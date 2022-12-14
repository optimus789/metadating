import { Box, HStack, VStack, Text, Button, Stack } from '@chakra-ui/react';
import { useMetaMask } from 'metamask-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { request } from '../../utils/types';
import { getOwnerOfToken, sendRequest } from '../utils/utils';

type RequestCardProps = request;

const RequestCard: React.FC<RequestCardProps> = ({ from }) => {
	const [loadingA, setLoadingA] = useState(false);
	const [loadingD, setLoadingD] = useState(false);
	const [acceptDisable, setAcceptDisable] = useState(false);
	const [rejectDisable, setRejectDisable] = useState(false);
	const [userMsg, setUserMsg] = useState('');
	const baseUrl = String(process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
	const [nextLink, setNextLink] = useState(`${baseUrl}/profile`);
	const { account } = useMetaMask();

	const handleAccept = async () => {
		setLoadingA(true);
		const senderAddress = await getOwnerOfToken(from.tokenId);
		if (senderAddress.length) {
			const sendAcceptedUpdate = await sendRequest(
				account || '',
				senderAddress,
				'accepted',
				true
			);
			if (sendAcceptedUpdate) {
				setAcceptDisable(true);
				setRejectDisable(true);
				setNextLink('https://xmtp.vercel.app/dm/' + senderAddress);
				setUserMsg('accepted');
			}
		}
		setLoadingA(false);
	};

	const handleDecline = async () => {
		setLoadingD(true);

		const senderAddress = await getOwnerOfToken(from.tokenId);
		if (senderAddress.length) {
			const sendAcceptedUpdate = await sendRequest(
				account || '',
				senderAddress,
				'declined',
				true
			);
			if (sendAcceptedUpdate) {
				setAcceptDisable(true);
				setRejectDisable(true);
				setNextLink('https://xmtp.vercel.app');
				setUserMsg('declined');
			}
		}

		setLoadingD(false);
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
				{/* <Text color="white">Sent on: {format(createdAt, 'dd.MM.yyyy')}</Text> */}
			</VStack>
			<HStack>
				{!acceptDisable && (
					<Button
						colorScheme="green"
						isLoading={loadingA}
						onClick={handleAccept}
					>
						Accept
					</Button>
				)}
				{!rejectDisable && (
					<Button
						colorScheme="red"
						isLoading={loadingD}
						onClick={handleDecline}
					>
						Decline
					</Button>
				)}
				{rejectDisable && acceptDisable && userMsg === 'accepted' && (
					<Link key="xmtpLink" href={nextLink}>
						<a target="_blank">
							<Text color="white">Accepted, Click here to start chatting</Text>
						</a>
					</Link>
				)}
				{rejectDisable && acceptDisable && userMsg === 'declined' && (
					<Link key="xmtpLink" href={nextLink}>
						<a target="_blank">
							<Text color="white">
								Request Declined, Click here to check old messages
							</Text>
						</a>
					</Link>
				)}
			</HStack>
		</Stack>
	);
};

export default RequestCard;
