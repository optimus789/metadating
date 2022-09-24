import { NextApiResponse, NextApiRequest } from 'next';
import { tableland } from '../../../utils/tableland.utils';

const tableName = 'requests_80001_2562';

// function to get the data from the request
// Schema - address text, requestobj text, primary key (address)
export default async function update(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log('something- -------------------------');

	if (req.method === 'POST') {
		const { address, status } = req.body;
		// console.log('address', address);
		console.log('requestobj', status);
		const updateQuery = `UPDATE ${tableName} SET requestobj='${status}' WHERE address='${address}';`;
		// const senderAddr='0xb7e0bd7f8eae0a33f968a1ffb32de07c749c7390'
		// const updateQuery = `UPDATE ${tableName} SET address='${address}req${senderAddr}' WHERE address='${address}';`;
		const updateRes = await tableland.write(updateQuery);
		console.log('updateRes', updateRes);
		// const insert = await table.insert({ address, requestobj });
		// console.log('insert', insert);
		return res.status(200).json({ success: true });
		} else {
		// get the data from the table
		const { address } = req.body;
		const query = `SELECT * FROM ${tableName} where address='${address}';`;
		console.log('query', query);
		const { columns, rows } = await tableland.read(query);
		console.log(columns, rows);
		// console.log('tables', tables);
		return res.send('hello world');
	}
}
