import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  const dir = req.query.dir as string;
  const file = req.query.file as string;
  const fileType = req.query.fileType as string;

  // Make sure we have what we need
  if (!userId || !file || !fileType || !dir) {
    return res.status(400).json({ error: 'id, dir, file or fileType missing' });
  }

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${userId}/${dir}/${uuidv4()}_${file}`,
    Fields: {
      // acl: 'public-read',
      'Content-Type': fileType,
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
