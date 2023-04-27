import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (
    !body.text_prompts ||
    !body.init_image ||
    !body.mask_source ||
    !body.mask_image
  ) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: 'Incomplete request data' }));
    return;
  }

  const formData = new FormData();
  formData.append('text_prompts', body.text_prompts);
  formData.append('init_image', body.init_image);
  formData.append('mask_source', body.mask_source);
  formData.append('mask_image', body.mask_image);

  const engine_id = 'stable-diffusion-xl-beta-v2-2-2';

  const response = await fetch(
    `https://api.stability.ai/v1/generation/${engine_id}/image-to-image/masking`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DREAM_APIKEY}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }
  );

  if (!response.ok) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error }));
    return;
  }

  interface GenerationResponse {
    artifacts: Array<{
      base64: string;
      seed: number;
      finishReason: string;
    }>;
  }

  const responseJSON = (await response.json()) as GenerationResponse;
  res.statusCode = 201;
  res.end(JSON.stringify(responseJSON));
}
