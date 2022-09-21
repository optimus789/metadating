import { ethers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import { EncodedURL } from 'nft.storage/dist/src/lib/interface';
import { abi } from '../../utils/abi';
import { registerInput } from '../../utils/schemas/register.schema';
import { user } from '../../utils/types';

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
		console.log(nftPortKey, contractAddress);
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

// // function to fetch contract nfts using nftport API
// export async function getNFTs() {
// 	try {
// 		const nftPortKey = process.env.NEXT_PUBLIC_NFTPORT_API_KEY || '';
// 		const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
// 		const response = await fetch(
// 			`https://api.nftport.xyz/v0/nfts/${contractAddress}?chain=polygon`,
// 			{
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: nftPortKey,
// 				},
// 			}
// 		);
// 		const data = await response.json();
// 		console.log('data', data);
// 		let res;
// 		if (data?.response === 'OK' && data?.nfts.length) {
// 			let nfts: any[] = data?.nfts;
// 			res = nfts.map((nft, i) => {
// 				return {
// 					name: nft[i]?.name,
// 					description: nft[i]?.description,
// 					profilePic: nft[i]?.image,
// 					'favNFT1-tokenID': 'null',
// 					'favNFT1-contractAddress': 'null',
// 					'favNFT2-tokenID': 'null',
// 					'favNFT2-contractAddress': 'null',
// 					'favNFT3-tokenID': 'null',
// 					'favNFT3-contractAddress': 'null',
// 					nft1Img: nft[i]?.properties?.fav_nfts_images[0],
// 					nft2Img: nft[i]?.properties?.fav_nfts_images[1],
// 					nft3Img: nft[i]?.properties?.fav_nfts_images[2],
// 					age: nft[i]?.properties?.age,
// 					sex: nft[i]?.properties?.sex,
// 					country: nft[i]?.properties?.country,
// 					city: nft[i]?.properties?.city,
// 				};
// 			});
// 			console.log('consoling res data for nfts: ', res);
// 			return res;
// 		}
// 		return [];
// 	} catch (error) {
// 		console.log(error);
// 		return [];
// 	}
// }

// function to fetch contract nfts using covalent API
export async function getNFTs() {
	try {
		const covalentKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY || '';
		const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
		const response = await fetch(
			`https://api.covalenthq.com/v1/137/tokens/${contractAddress}/nft_token_ids/?key=${covalentKey}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		console.log('data', data);
		let res = [];
		let nfts: any[] = data?.data?.items || [];
		if (nfts.length) {
			for (let i = 0; i < nfts.length; i++) {
				const nft = nfts[i];
				let metadata: user | boolean = await getExternalMetadata(
					nft?.token_id,
					contractAddress
				);
				if (metadata !== false) {
					res.push(metadata);
				}
			}
		}
		return nfts.length ? res : [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function getExternalMetadata(tokenId: string, contractId: string) {
	try {
		// call retrieve NFT details from nftport api
		const nftPortKey = process.env.NEXT_PUBLIC_NFTPORT_API_KEY || '';
		const response = await fetch(
			`https://api.nftport.xyz/v0/nfts/${contractId}/${tokenId}?chain=polygon`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: nftPortKey,
				},
			}
		);
		const data = await response.json();
		console.log(`data for token id ${tokenId}`, data);
		if (data?.response === 'OK') {
			let nft = data?.nft;
			return {
				name: nft?.metadata?.name,
				description: nft?.metadata?.description,
				profilePic: nft?.metadata?.image.replace(
					'ipfs://',
					'https://ipfs.io/ipfs/'
				),
				'favNFT1-tokenID': 'null',
				'favNFT1-contractAddress': 'null',
				'favNFT2-tokenID': 'null',
				'favNFT2-contractAddress': 'null',
				'favNFT3-tokenID': 'null',
				'favNFT3-contractAddress': 'null',
				nft1Img: nft?.metadata?.properties?.fav_nfts_images[0],
				nft2Img: nft?.metadata?.properties?.fav_nfts_images[1],
				nft3Img: nft?.metadata?.properties?.fav_nfts_images[2],
				age: nft?.metadata?.properties?.age,
				sex: nft?.metadata?.properties?.sex,
				country: nft?.metadata?.properties?.country,
				city: nft?.metadata?.properties?.city,
				tokenId: nft?.token_id,
			};
		}
		return false;
	} catch (error) {
		console.log(`Error for token ID ${tokenId}: `, error);
		return false;
	}
}

// function get the owner of tokenid using etherjs
export async function getOwnerOfToken(tokenId: string) {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.NEXT_PUBLIC_POLYGON_URL || ''
		);
		const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
		const contract = new ethers.Contract(contractAddress, abi, provider);
		const owner = await contract.ownerOf(tokenId);
		console.log(`owner of token ${tokenId} is: `, owner);
		return owner;
	} catch (error) {
		console.log(error);
		return '';
	}
}
