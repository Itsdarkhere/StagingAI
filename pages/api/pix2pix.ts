// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = 'ef7b8fb5-a695-472e-9d01-4195a1e25553'
const modelKey = '44d4d534-bca0-4178-b6b3-2178a0317661'

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
        "prompt": `Make it look like skyrim`,
        "image_url": "https://anna.fi/awpo/img/s3/2021/07/29091857/kaupunkikesa_5.jpg?s=14f5aafbc2dd5fea2e1b7a0038c881db",
        "guidance_scale": 7.5,
        "image_guidance_scale": 1.5
    }
  
    const data = await banana.run(bananaKey, modelKey, modelParams);
  
    res.status(200).json({ data });
}
