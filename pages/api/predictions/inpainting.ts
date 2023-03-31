import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.room || !body.style || !body.image || !body.mask || !body.copies) {
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
        'd4d94fa01e89cffc4c0eec5d7497c24df29b5e55e3930c51e4a91666dcae1a7f',
      input: {
        prompt: body.room,
        negative_prompt: '',
        image: body.image,
        concept: body.concept,
        mask: body.mask,
        num_outputs: body.copies,
        num_inference_steps: 25,
        guidance_scale: 6,
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
