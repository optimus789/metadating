/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerInput } from '../utils/schemas/register.schema';

export type user = registerInput & {
	nft1Img: any;
	nft2Img: any;
	nft3Img: any;
	tokenId: string;
	xmtp?: any;
};

export type request = {
	from: user;
	createdAt?: Date;
};

export type userProfile = user & {
	requests: request[];
};
