import { NFTStorage } from 'nft.storage';
import { EncodedURL } from 'nft.storage/dist/src/lib/interface';
import { registerInput } from '../../utils/schemas/register.schema';

async function getMetadata(nftTokenId: any, contractAddress: any) {
	try {
		// get metadata from contract using Covalent API
		const response = await fetch(
			`https://api.covalenthq.com/v1/1/tokens/${contractAddress}/nft_metadata/${nftTokenId}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
		);
		const data = await response.json();
		console.log('nftMetadata of user: ', nftTokenId, ': ', data);
		const imageUri =
			data?.data?.items[0]?.nft_data[0]?.external_data?.image || false;
		return imageUri;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// get image metadata of 3 favorite NFTs
export async function getImagesMetadata(
	nftTokenIds: string[],
	contractAddress: string[]
) {
	try {
		let imagesMetadata: any[] = [];
		let errorCaught: boolean = false;
		for (let i = 0; i < nftTokenIds.length; i++) {
			const nftMetadata = await getMetadata(nftTokenIds[i], contractAddress[i]);
			if (nftMetadata === false) {
				alert('Wrong token id or contract address provided, please try again');
				errorCaught = true;
				break;
			} else {
				imagesMetadata.push(nftMetadata);
			}
		}
		return !errorCaught ? imagesMetadata : false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function verifyWorldId(
	proof: any,
	nullifier_hash: string,
	merkle_root: string,
	signal: string,
	action_id: string
) {
	try {
		const response = await fetch(
			`https://developer.worldcoin.org/api/v1/verify`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					action_id: action_id,
					signal: signal,
					proof: proof,
					nullifier_hash: nullifier_hash,
					merkle_root: merkle_root,
				}),
			}
		);
		const data = await response.json();
		if (data?.code === 'already_verified') {
			alert(data?.detail);
		}
		return data?.success === true ? true : false || true; //remove || true if it is there
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function createMetadatOnIpfs(
	values: registerInput,
	imagesMetadata: string[] | boolean
) {
	try {
		const client = new NFTStorage({
			token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || '',
		});
		console.log('values', values);
		const nft = {
			name: values.name,
			image: values.profilePic,
			description: values.description,
			properties: {
				age: values.age,
				sex: values.sex,
				city: values.city,
				country: values.country,
				fav_nfts_images: imagesMetadata || [],
			},
		};
		const res = await client.store(nft);
		console.log(res);
		return res?.url || false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export async function mintNFTs(
	metadataUri: EncodedURL | boolean,
	mintToAddress: any
) {
	try {
		const nftPortKey = process.env.NEXT_PUBLIC_NFTPORT_API_KEY || '';
		const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
		console.log(nftPortKey,contractAddress)
		const response = await fetch(
			`https://api.nftport.xyz/v0/mints/customizable`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: nftPortKey,
				},
				body: JSON.stringify({
					chain: 'polygon',
					contract_address: contractAddress,
					metadata_uri: metadataUri,
					mint_to_address: mintToAddress,
				}),
			}
		);
		const data = await response.json();
		console.log('data', data);
		return data?.response === 'OK' ? true : false;
	} catch (error) {
		console.log(error);
		return false;
	}
}
