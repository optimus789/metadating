import { NextApiResponse, NextApiRequest } from 'next';
import { tableland } from '../../../utils/tableland.utils';

const tableName = 'requests_80001_2562';

// function to get the data from the request
// Schema - address text, requestobj text, primary key (address)
export default async function insert(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log('something- -------------------------');

	if (req.method === 'POST') {
		const { address, status } = req.body;
		const insertQuery = `INSERT INTO ${tableName} (address, requestobj) VALUES ('${address}', '${status}');`;
		const insertRes = await tableland.write(insertQuery);
		console.log('insertRes', insertRes);
		// const insert = await table.insert({ address, requestobj });
		// console.log('insert', insert);
		return res.status(200).json({ success: true });
	} else {
		// get the data from the table
		const { address } = req.body;
		const query = `SELECT * FROM ${tableName} where address LIKE '${address}';`;
		// const query = `SELECT * FROM ${tableName}`;
		console.log('query', query);
		const { columns, rows } = await tableland.read(query);
		console.log(columns, rows);
		// console.log('tables', tables);
		return res.send('hello world');
	}
}
