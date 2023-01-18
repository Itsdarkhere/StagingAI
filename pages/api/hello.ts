// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

type Data = {
  name: string;
};

export default function handler(
  req: NextRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
