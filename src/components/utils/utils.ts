export async function getMetadata(nftTokenId: number, contractAddress: string) {
	// get metadata from contract using Covalent API
	const response = await fetch(
		`https://api.covalenthq.com/v1/1/tokens/${contractAddress}/nft_metadata/${nftTokenId}/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
	);
	const data = await response.json();
	return data;
}

export async function verifyWorldId(
	proof: any,
	nullifier_hash: string,
	merkle_root: string,
	signal: string,
	action_id: string
) {
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
	return data?.success === true ? true : false;
}
