// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const banana = require('@banana-dev/banana-dev');
const bananaKey = process.env.BANANA_API_KEY;
const modelKey = 'e00d3cbe-ad12-442a-a20f-160c6e75f989';

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

  if (!body.room || !body.style || !body.image || !body.mask) {
    console.log('Missing required fields');
    return res.status(400).send({ message: 'Missing required fields' });
  }

  // prompt = model_inputs.get('prompt', None)
  // negative_prompt = model_inputs.get('negative_prompt', None)
  // height = model_inputs.get('height', 512)
  // width = model_inputs.get('width', 512)
  // steps = model_inputs.get('steps', 20)
  // guidance_scale = model_inputs.get('guidance_scale', 7)
  // seed = model_inputs.get('seed', None)
  // scheduler = model_inputs.get('scheduler', 'K_EULER_ANCESTRAL')
  // mask = model_inputs.get('mask', None)
  // init_image = model_inputs.get('init_image', None)

  const modelParams = {
    prompt: `Empty wall, no bed`,
    init_image: body.image,
    mask: body.mask,
    guidance_scale: 12,
    steps: 50,
  };

  const data = await banana.run(bananaKey, modelKey, modelParams);

  res.status(200).json({ data });
}
