import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (
    !body.room ||
    !body.style ||
    !body.image ||
    !body.mask ||
    !body.copies ||
    !body.width ||
    !body.height
  ) {
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
        'a4de72df6527c23fe51638e354fe87398dd2ba53e785ded19fae06ac69816ac8',
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
        scheduler: 'K_EULER_ANCESTRAL',
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
