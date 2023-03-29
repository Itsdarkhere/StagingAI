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

  console.log(body.copies);

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version:
        'e95cfec4806a1ea9ade8c651d0c031271b8d6c65f183944ceda37961a9a384e1',
      input: {
        prompt: body.room,
        negative_prompt: '',
        image: body.image,
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
