import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { user } from '../../utils/types';

export async function sendMessageXmtp(
	xmtp: Client,
	user: user,
	senderAddr: string
) {
	const message = {
		
	}
	return 'aa';
}

export async function getXmtpClient(window: any) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const xmtpSigner = provider.getSigner();
	const xmtpClient = await Client.create(xmtpSigner, { env: 'dev' });
	return xmtpClient;
}
