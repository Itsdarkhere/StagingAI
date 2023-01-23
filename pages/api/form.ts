// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  if (!body.room || !body.style || !body.copies || !body.image) {
    return res.status(400).json({ data: 'Data is incomplete' });
  }

  res.status(200).json({ data: 'Very nice brother' });
}
