import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: req.query.file as string,
    Fields: {
      // acl: 'public-read',
      'Content-Type': req.query.fileType as string,
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}
