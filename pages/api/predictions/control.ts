import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body.room || !body.style || !body.image) {
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
        '8ebda4c70b3ea2a2bf86e44595afb562a2cdf85525c620f1671a78113c9f325b',
      input: {
        image: body.image,
        prompt: `${body.room} in ${body.style}, interior design, interior, decor, furniture`,
        model_type: 'canny',
        num_samples: '1',
        image_resolution: '512',
        ddim_steps: 20,
        scale: 9,
        seed: null,
        eta: 0,
        a_prompt: 'best quality, extremely detailed',
        n_prompt:
          'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
        detect_resolution: 512,
        low_threshold: 100,
        high_threshold: 200,
        bg_threshold: 0,
        value_threshold: 0.1,
        distance_threshold: 0.1,
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
