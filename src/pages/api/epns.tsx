import { NextApiResponse, NextApiRequest } from 'next';
import { sendEpnsNotification } from '../../utils/epns.utils';

// function to send the notification to a user
export default async function sendNotification(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === 'POST') {
			console.log('Epns notification send ----> ');
			// get the data from the table
			const { address, message, payload } = req.body;
			const sentNotification = await sendEpnsNotification(
				address,
				message,
				payload
			);
			console.log('sentNotification', sentNotification);

			return res.status(200).json({ success: true });
		}
		return res
			.status(300)
			.json({ success: false, error: 'Invalid request method' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, error: error });
	}
}
