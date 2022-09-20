import { registerInput } from '../utils/schemas/register.schema';

export type user = registerInput & {
	nft1Img: any;
	nft2Img: any;
	nft3Img: any;
};

export type nft = {
	name: string;
	description: string;
	properties:{
		age: Number;
		sex: string;
		city: string;
		country: string;
		fav_nfts_images: string[];
	};
	image: string[]
}

export type request = {
	from: user;
	createdAt: Date;
};

export type userProfile = user & {
	requests: request[];
};
