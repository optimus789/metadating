import { connect } from '@tableland/sdk';
import { ethers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import { EncodedURL } from 'nft.storage/dist/src/lib/interface';
import { abi } from '../../utils/abi';
import { registerInput } from '../../utils/schemas/register.schema';
import { user } from '../../utils/types';

export const tableland = connect({
	chain: 'polygon-mumbai',
});
const provider = new ethers.providers.JsonRpcProvider(
	process.env.NEXT_PUBLIC_POLYGON_URL || ''
);
const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';

const contract = new ethers.Contract(contractAddress, abi, provider);
async function getMetadata(nftTokenId: any, contractAddress: any) {
	try {
		// get metadata from contract using Covalent API
		const response = await fetch(
			`https://api.covalenthq.com/v1/1/tokens/${contractAddress}/nft_metadata/${nftTokenId}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
		);
		const data = await response.json();
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
		const imagesMetadata: any[] = [];
		let errorCaught = false;
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
export async function getNFTs(userAddress: string | null, xmtp: any) {
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
		const res = [];
		const tokenId = await getTokenOfOwner(userAddress);
		const nfts: any[] = data?.data?.items || [];
		if (nfts.length) {
			for (let i = 0; i < nfts.length; i++) {
				const nft = nfts[i];
				if (nft?.token_id !== tokenId) {
					const metadata: (user & { xmtp: any }) | boolean =
						await getExternalMetadata(nft?.token_id, contractAddress, xmtp);
					if (metadata !== false) {
						res.push(metadata);
					}
				}
			}
		}
		return nfts.length ? res : [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function getExternalMetadata(
	tokenId: string,
	contractAddr: string,
	xmtp: any
) {
	try {
		// call retrieve NFT details from nftport api
		const nftPortKey = process.env.NEXT_PUBLIC_NFTPORT_API_KEY || '';
		const response = await fetch(
			`https://api.nftport.xyz/v0/nfts/${contractAddr}/${tokenId}?chain=polygon`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: nftPortKey,
				},
			}
		);
		// const alchemyApiUrl = process.env.NEXT_PUBLIC_ALCHEMY_NFT_POLYGON || '';
		// const response = await fetch(
		// 	`${alchemyApiUrl}/getNFTMetadata?contractAddress=${contractAddr}&tokenId=${tokenId}`,
		// 	{
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}
		// );
		const data = await response.json();
		// if (data?.metadata) {
		if (data?.response === 'OK') {
			// const nft = data?.metadata;
			const nft = data?.nft;
			console.log('NFT: ', nft);
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
				tokenId: nft?.token_id || data?.id?.tokenId,
				xmtp: xmtp,
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
		const owner = await contract.ownerOf(tokenId);
		return owner.toLowerCase();
	} catch (error) {
		console.log(error);
		return '';
	}
}

// function get the tokenid Of Owner using etherjs
export async function getTokenOfOwner(address: string | null) {
	try {
		const tokenId = await contract.tokenOfOwnerByIndex(address, 0);
		return String(tokenId);
	} catch (error) {
		console.log('This user has no token minted to their wallet');
		return '';
	}
}

// function to send the requests to API
export async function sendRequest(
	requesteeAddress: string,
	requestObj: string,
	insertQuery: boolean
) {
	try {
		let response;
		if (insertQuery) {
			// tableland backend api POST insert query
			response = await fetch(
				'https://tableland-backend.herokuapp.com/api/insert',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						requesteeAddress,
						requestObj,
					}),
				}
			);
		} else {
			response = await fetch(`/api/request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					address: requesteeAddress,
					requestObj,
				}),
			});
		}

		const data = await response.json();
		console.log('data for insert/update tableland query', data);
		return data;
	} catch (error) {
		console.log(error);
		return { message: error };
	}
}

// function to get the requests from API
export async function getRequests(userAddress: string | null) {
	try {
		if (null) return;
		const response = await fetch(`/api/request`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userAddress,
			}),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return { message: 'Something went wrong' };
	}
}

export const checkSentRequest = async (
	tokenid: string,
	userAddress: string
) => {
	try {
		const tableName = 'requests_80001_2562';
		const requesteeAddress = await getOwnerOfToken(tokenid);
		const getQuery = `SELECT * FROM ${tableName} where address='${requesteeAddress}';`;
		const getData = await tableland.read(getQuery);
		let requestObj = null;
		let flag = false;
		if (Array.isArray(getData?.rows) && getData?.rows.length > 0) {
			requestObj = getData?.rows[0][1];
			if (requestObj?.[userAddress.toLowerCase()]) {
				flag = true;
			}
		}
		return [flag, requestObj, requesteeAddress];
	} catch (error) {
		console.log(error);
		return [false, null, null];
	}
};

export const insertRequest = async (
	requesteeAddress: string,
	userAddress: string
) => {
	try {
		// fetch post request to backend api on route /api/tableland/insert
		const response = await fetch(
			'https://tableland-backend.herokuapp.com/api/insert',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requesteeAddress: requesteeAddress.toLowerCase(),
					userAddress: userAddress.toLowerCase(),
				}),
			}
		);
		const data = await response.json();
		console.log('data for insert/update tableland query', data);
		return data;
	} catch (error) {
		console.log(error);
		return false;
	}
};
