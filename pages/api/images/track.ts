import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_WRITER_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, urls } = req.body;

  if (!userId || !urls) {
    return res.status(400).json({ error: 'No userId or urls provided' });
  }

  try {
    // Make the query
    const values = urls.flatMap((url: string) => [userId, url]);
    const valuePlaceholders = urls
      .map((_: any, index: number) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(', ');
    const query = `INSERT INTO images (id, url) VALUES ${valuePlaceholders} RETURNING *`;
    // Send the query
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      // User not found
      res.status(401).json({ error: 'Insert unsuccesful...' });
      return;
    }

    res.status(200).json({ message: 'URLs inserted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
