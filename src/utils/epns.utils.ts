import * as EpnsAPI from '@epnsproject/sdk-restapi';
import * as ethers from 'ethers';

const PKey = process.env.EPNS_PRIV_KEY || ''; // channel private key
// const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(PKey);

export const sendEpnsNotification = async (
	reciepientAddress: string,
	message: string,
	payload: string
) => {
	try {
		const channelAddress = await signer.getAddress();
		const apiResponse = await EpnsAPI.payloads.sendNotification({
			signer,
			type: 3, // target
			identityType: 2, // direct payload
			notification: {
				title: `New Notification from Metadating`,
				body: message,
			},
			payload: {
				title: `Wakeup Call, check your requests, you have a new one`,
				body: payload,
				cta: '',
				img: 'https://metadating-27y58.ondigitalocean.app/_next/static/media/Meta-Dating.7a8430f3.svg',
			},
			recipients: `eip155:80001:${reciepientAddress}`, // recipient address
			channel: `eip155:80001:${channelAddress}`, // your channel address
			env: 'staging',
		});

		// apiResponse?.status === 204, if sent successfully!
		console.log('API repsonse: ', apiResponse);
		return apiResponse?.status === 204 ? true : false;
	} catch (err) {
		console.error('Error: ', err);
		return false;
	}
};
