import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl, width, height } = req.query;

  if (!imageUrl || !width || !height) {
    return res
      .status(400)
      .json({ error: 'No imageUrl, width or height provided' });
  }

  try {
    const imageWidth = parseInt(width as string, 10);
    const imageHeight = parseInt(height as string, 10);

    // Fetch the image
    const response = await fetch(imageUrl as string);
    const buffer = await response.arrayBuffer();

    // Resize the image
    const resizedImageBuffer = await sharp(buffer)
      .resize(imageWidth, imageHeight)
      .toBuffer();

    res.setHeader('Content-Type', response.headers.get('Content-Type')!);
    res.status(200).send(resizedImageBuffer);
  } catch {
    res.status(500).json({ error: 'Error resizing image' });
  }
}
