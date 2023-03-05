import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.room || !body.style || !body.image || !body.mask) {
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
        'c28b92a7ecd66eee4aefcd8a94eb9e7f6c3805d5f06038165407fb5cb355ba67',
      input: {
        prompt: body.room,
        negative_prompt: '',
        image: body.image,
        mask: body.mask,
        num_outputs: 1,
        num_inference_steps: 35,
        guidance_scale: 7.5,
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
