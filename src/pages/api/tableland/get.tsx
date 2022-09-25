import { NextApiResponse, NextApiRequest } from 'next';
import { tableland } from '../../../utils/tableland.utils';

const tableName = 'requests_80001_2562';

// function to get the data from the request
// Schema - address text, requestobj text, primary key (address)
export default async function get(req: NextApiRequest, res: NextApiResponse) {
	console.log('something- -------------------------');

	// get the data from the table
	const { address } = req.body;
	const query = `SELECT * FROM ${tableName} where address LIKE '${address}';`;
	// const query = `SELECT * FROM ${tableName} where address LIKE '%req%';`;
	console.log('query', query);
	const { columns, rows } = await tableland.read(query);
	console.log(columns, rows);
	// console.log('tables', tables);
	return res.send('hello world');
}
