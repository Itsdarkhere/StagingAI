// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = 'ef7b8fb5-a695-472e-9d01-4195a1e25553'
const modelKey = '792af5a9-da57-47be-9387-6117d6f12570'
const modelParams = {
  "prompt": "A modern minimalist living room, photorealistic, hd, interior design",
  "height": 768,
  "width": 768,
  "steps": 20,
  "guidance_scale": 9,
  "seed": 1,
}
type Data = {
  data: {
    apiVersion: string,
    created: number,
    id: string,
    message: string,
    modelOutputs: []
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const body = req.body;

  //if (!body.room || !body.style || !body.copies || !body.image) {
  //  return res.status(400).json({ data: 'Data is incomplete' });
  //}
  const data = await banana.run(bananaKey, modelKey, modelParams);

  res.status(200).json({ data });
}
