import { registerInput } from '../utils/schemas/register.schema';

export type user = registerInput & {
	nft1Img: any;
	nft2Img: any;
	nft3Img: any;
};