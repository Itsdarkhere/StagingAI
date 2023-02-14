// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = 'ef7b8fb5-a695-472e-9d01-4195a1e25553'
const modelKey = '2db08e43-4ddf-4eb0-8003-567198c43124'

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

    if (!body.room || !body.style || !body.image) {
      return res.status(400).send({message: 'Missing required fields'});
    }
  
    const modelParams = {
        "prompt": `Furnished living room, modern minimalist, 4k, photorealistic`,
        "image": body.image,
        "guidance_scale": 12,
        "strength": 0.7
    }
  
    const data = await banana.run(bananaKey, modelKey, modelParams);
  
    res.status(200).json({ data });
}
