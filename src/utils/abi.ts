export const abi = [
	{
		inputs: [
			{
				components: [
					{
						internalType: 'string',
						name: 'name',
						type: 'string',
					},
					{
						internalType: 'string',
						name: 'symbol',
						type: 'string',
					},
					{
						internalType: 'address',
						name: 'owner',
						type: 'address',
					},
					{
						internalType: 'bool',
						name: 'tokensBurnable',
						type: 'bool',
					},
				],
				internalType: 'struct Config.Deployment',
				name: 'deploymentConfig',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'string',
						name: 'baseURI',
						type: 'string',
					},
					{
						internalType: 'bool',
						name: 'metadataUpdatable',
						type: 'bool',
					},
					{
						internalType: 'bool',
						name: 'tokensTransferable',
						type: 'bool',
					},
					{
						internalType: 'uint256',
						name: 'royaltiesBps',
						type: 'uint256',
					},
					{
						internalType: 'address',
						name: 'royaltiesAddress',
						type: 'address',
					},
				],
				internalType: 'struct Config.Runtime',
				name: 'runtimeConfig',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'role',
						type: 'bytes32',
					},
					{
						internalType: 'address[]',
						name: 'addresses',
						type: 'address[]',
					},
					{
						internalType: 'bool',
						name: 'frozen',
						type: 'bool',
					},
				],
				internalType: 'struct GranularRoles.RolesAddresses[]',
				name: 'rolesAddresses',
				type: 'tuple[]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
		signature: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'approved',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'Approval',
		type: 'event',
		signature:
			'0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'approved',
				type: 'bool',
			},
		],
		name: 'ApprovalForAll',
		type: 'event',
		signature:
			'0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
		signature:
			'0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'string',
				name: '_value',
				type: 'string',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_id',
				type: 'uint256',
			},
		],
		name: 'PermanentURI',
		type: 'event',
		signature:
			'0xa109ba539900bf1b633f956d63c96fc89b814c7287f7aa50a9216d0b55657207',
	},
	{
		anonymous: false,
		inputs: [],
		name: 'PermanentURIGlobal',
		type: 'event',
		signature:
			'0xb59f45df38ec0d34114b1248c38a29cdbccbf3e745ae3ef310ac66199a4ceccf',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'previousAdminRole',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'newAdminRole',
				type: 'bytes32',
			},
		],
		name: 'RoleAdminChanged',
		type: 'event',
		signature:
			'0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'sender',
				type: 'address',
			},
		],
		name: 'RoleGranted',
		type: 'event',
		signature:
			'0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'sender',
				type: 'address',
			},
		],
		name: 'RoleRevoked',
		type: 'event',
		signature:
			'0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'Transfer',
		type: 'event',
		signature:
			'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
	},
	{
		inputs: [],
		name: 'ADMIN_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x75b238fc',
	},
	{
		inputs: [],
		name: 'BURN_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xb930908f',
	},
	{
		inputs: [],
		name: 'DEFAULT_ADMIN_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xa217fddf',
	},
	{
		inputs: [],
		name: 'MINT_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xe9a9c850',
	},
	{
		inputs: [],
		name: 'TRANSFER_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x206b60f9',
	},
	{
		inputs: [],
		name: 'UPDATE_CONTRACT_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x2c23b965',
	},
	{
		inputs: [],
		name: 'UPDATE_TOKEN_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xb29c097a',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'approve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x095ea7b3',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x70a08231',
	},
	{
		inputs: [],
		name: 'baseURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x6c0360eb',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
		],
		name: 'burn',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x42966c68',
	},
	{
		inputs: [],
		name: 'contractURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xe8a3d485',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'freezeTokenUris',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x8d010db3',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'getApproved',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x081812fc',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
		],
		name: 'getRoleAdmin',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x248a9ca3',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'grantRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x2f2ff15d',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'hasRole',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x91d14854',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
		],
		name: 'isApprovedForAll',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xe985e9c5',
	},
	{
		inputs: [],
		name: 'metadataUpdatable',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x4e6f9dd6',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'caller',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'tokenURI',
				type: 'string',
			},
		],
		name: 'mintToCaller',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x7afdcdbb',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x06fdde03',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x8da5cb5b',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'ownerOf',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x6352211e',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'renounceRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x36568abe',
	},
	{
		inputs: [],
		name: 'revokeNFTPortPermissions',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xf153c2e5',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'revokeRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xd547741f',
	},
	{
		inputs: [],
		name: 'royaltiesAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x32882535',
	},
	{
		inputs: [],
		name: 'royaltiesBasisPoints',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xa53a84b6',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'salePrice',
				type: 'uint256',
			},
		],
		name: 'royaltyInfo',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x2a55205a',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x42842e0e',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes',
			},
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xb88d4fde',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'operator',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'approved',
				type: 'bool',
			},
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xa22cb465',
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4',
			},
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x01ffc9a7',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x95d89b41',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		name: 'tokenByIndex',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x4f6ccce7',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		name: 'tokenOfOwnerByIndex',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x2f745c59',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xc87b56dd',
	},
	{
		inputs: [],
		name: 'tokensBurnable',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xe3d52072',
	},
	{
		inputs: [],
		name: 'tokensTransferable',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0xde374d9d',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
		signature: '0x18160ddd',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
		],
		name: 'transferByOwner',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x21e92d49',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
		],
		name: 'transferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x23b872dd',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xf2fde38b',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'string',
						name: 'baseURI',
						type: 'string',
					},
					{
						internalType: 'bool',
						name: 'metadataUpdatable',
						type: 'bool',
					},
					{
						internalType: 'bool',
						name: 'tokensTransferable',
						type: 'bool',
					},
					{
						internalType: 'uint256',
						name: 'royaltiesBps',
						type: 'uint256',
					},
					{
						internalType: 'address',
						name: 'royaltiesAddress',
						type: 'address',
					},
				],
				internalType: 'struct Config.Runtime',
				name: 'newConfig',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'role',
						type: 'bytes32',
					},
					{
						internalType: 'address[]',
						name: 'addresses',
						type: 'address[]',
					},
					{
						internalType: 'bool',
						name: 'frozen',
						type: 'bool',
					},
				],
				internalType: 'struct GranularRoles.RolesAddresses[]',
				name: 'rolesAddresses',
				type: 'tuple[]',
			},
			{
				internalType: 'bool',
				name: 'isRevokeNFTPortPermissions',
				type: 'bool',
			},
		],
		name: 'update',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0x2e628b61',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: '_tokenUri',
				type: 'string',
			},
			{
				internalType: 'bool',
				name: '_isFreezeTokenUri',
				type: 'bool',
			},
		],
		name: 'updateTokenUri',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		signature: '0xa2f551ec',
	},
];
