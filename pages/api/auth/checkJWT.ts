import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;

  // Return if no JWT provided
  if (!authHeader) {
    return res.status(401).json({ error: 'No JWT provided' })
  };

  jwt.verify(authHeader, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
        return res.status(403).json({ error: 'Invalid or expired JWT'});
    } else {
        return res.status(200).json({ message: "JWT is valid"});
    }
  })
}