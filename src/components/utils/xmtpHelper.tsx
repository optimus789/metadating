import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { user } from '../../utils/types';
import { getExternalMetadata, getTokenOfOwner } from './utils';

export async function sendMessageXmtp(
	xmtp: Client,
	user: user,
	senderAddr: string,
	requesteeAddr: string
) {
	try {
		// const conversations = await xmtp.conversations.list();
		// console.log('conversations', conversations);
		const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';

		const tokenId = await getTokenOfOwner(senderAddr);
		const senderUser: (user & { xmtp: Client }) | boolean =
			await getExternalMetadata(tokenId, contractAddress, null);
		console.log('Sender user: ', senderUser, requesteeAddr);
		const conversation = await xmtp.conversations.newConversation(
			requesteeAddr
		);
		console.log('conversation', conversation);
		const message = `Hello ${user.name}, I am ${
			senderUser ? senderUser.name : 'someone'
		} How are you? I saw your profile on Metadating and I would like to connect with you.`;
		console.log(message);
		const res = await conversation.send(message);
		if (res?.id) {
			const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
			const msg = `Hi ${user.name}, you have a new request from ${
				senderUser ? senderUser?.name : 'Metadating'
			}.`;
			const bodyPayload =
				'Please check your Profile Page - https://metadating-27y58.ondigitalocean.app/profile';
			//fetch POST api backend to send notification
			const sentNotif = await fetch(`${url}/api/epns`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					address: requesteeAddr,
					message: msg,
					payload: bodyPayload,
				}),
			});

			console.log('sentNotif', sentNotif);
		}
		return res?.id || false;
	} catch (error) {
		return false;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getXmtpClient(window: any) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const xmtpSigner = provider.getSigner();
		const xmtpClient = await Client.create(xmtpSigner, { env: 'dev' });
		xmtpClient.address = await xmtpSigner.getAddress();

		return xmtpClient;
	} catch (error) {
		return false;
	}
}
