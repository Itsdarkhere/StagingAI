// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = 'ef7b8fb5-a695-472e-9d01-4195a1e25553'
const modelKey = '792af5a9-da57-47be-9387-6117d6f12570'

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
  res: NextApiResponse<Data | {message: string}>
) {
  const body = req.body;

  if (!body.room || !body.style) {
    return res.status(400).send({message: 'Missing required fields'});
  }

  const modelParams = {
    "prompt": `A ${body.room} in ${body.style} style.`,
    "height": 768,
    "width": 768,
    "steps": 20,
    "guidance_scale": 9,
  }

  const data = await banana.run(bananaKey, modelKey, modelParams);

  res.status(200).json({ data });
}
