import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.room || !body.style || !body.image || !body.mask || !body.copies || !body.width || !body.height) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: 'Incomplete request data' }));
    return;
  }

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version:
        'c10e556c38f9f899f783b7822f41ad8cb2fcc753cf0a7284eea2964e3fcaa101',
      input: {
        prompt: body.room,
        negative_prompt: 'wood, wooden frame',
        image: body.image,
        concept: body.concept,
        mask: body.mask,
        num_outputs: body.copies,
        num_inference_steps: 25,
        guidance_scale: 6,
        width: body.width,
        height: body.height,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
