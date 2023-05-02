import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_READER_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, fetchNumber } = req.body;

  if (!userId || !fetchNumber) {
    return res.status(400).json({ error: 'No userId or fetchNumber provided' });
  }

  console.log('REQBODY', req.body);

  try {
    const query = `
    SELECT url FROM images
    WHERE id = $1
    ORDER BY created_at DESC
    LIMIT 20
    OFFSET ($2 - 1) * 20;
    `;
    // Send the query
    const result = await pool.query(query, [userId, fetchNumber]);

    if (result.rowCount === 0) {
      // User not found
      res.status(401).json({ error: 'Unable to fetch URLs...' });
      return;
    }

    res.status(200).json({ message: 'URLs received', urls: result.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
