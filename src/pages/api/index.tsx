import { NextApiResponse, NextApiRequest } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log('req', req.body)
  return res.send('hello world')
}