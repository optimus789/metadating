import * as EpnsAPI from '@epnsproject/sdk-restapi';

export const optInChannel = async (signer: any, address: string) => {
	try {
		const channelAddress = process.env.NEXT_PUBLIC_CHANNEL_ADDR;
		const response = await EpnsAPI.channels.subscribe({
			signer: signer,
			channelAddress: `eip155:80001:${channelAddress}`, // channel address in CAIP
			userAddress: `eip155:80001:${address}`, // user address in CAIP
			onSuccess: () => {
				console.log('opt in success');
			},
			onError: () => {
				console.error('opt in error');
			},
			env: 'staging',
		});
		console.log('response of optinChannel', response);
		if (response) {
			return response?.status;
		}
		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
};
