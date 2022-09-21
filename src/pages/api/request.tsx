import { NextApiResponse, NextApiRequest } from 'next';
import { Wallet, providers } from 'ethers';
import { connect } from '@tableland/sdk';

const privateKey = process.env.PRIV_KEY || '';
const tableName = 'requests_80001_2562';
// const create = await tableland.create(
//     `address text, requestobj text, primary key (address)`,
//     { prefix: `requests` }
// );
// function to get the data from the request
export default async function request(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log('something- -------------------------');
	const wallet = new Wallet(privateKey);

	const provider = new providers.JsonRpcProvider(
		'https://soft-wandering-lake.matic-testnet.discover.quiknode.pro/764485113e0448fe07b207c16de6b69a686f90c1/'
	);
	const signer = wallet.connect(provider);
	const tableland = await connect({
		chain: 'polygon-mumbai',
		signer: signer,
	});

	if (req.method === 'POST') {
		const { address, requestobj } = req.body;
		console.log('address', address);
		console.log('requestobj', requestobj, JSON.stringify(requestobj));
		const insertRes = await tableland.write(
			`INSERT INTO ${tableName} (address, requestobj) VALUES ('${address}', '${JSON.stringify(
				requestobj
			)}');`
		);
		console.log('insertRes', insertRes);
		// const insert = await table.insert({ address, requestobj });
		// console.log('insert', insert);
		return res.status(200).json({ success: true });
	} else {
		// get the data from the table
        const {address} = req.body
		const tables = await tableland.list();
        const { columns, rows } = await tableland.read(`SELECT * FROM ${tableName} where address='${address}';`);
        console.log(columns, rows)
		// console.log('tables', tables);
		return res.send('hello world');
	}
}
