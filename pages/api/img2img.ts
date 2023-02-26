// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = process.env.BANANA_API_KEY;
const modelKey = '89b07d78-e2f8-4410-8708-0184120592f1';

type Data = {
  data: {
    apiVersion: string;
    created: number;
    id: string;
    message: string;
    modelOutputs: [];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  const body = req.body;

  if (!body.room || !body.style || !body.image) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const modelParams = {
    prompt: `A ${body.room} furnished in ${body.style} style, ${body.room}, ${body.style}`,
    image: body.image,
    guidance_scale: 12,
    strength: 0.5,
  };

  const data = await banana.run(bananaKey, modelKey, modelParams);

  res.status(200).json({ data });
}
