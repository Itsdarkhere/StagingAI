import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'No email or password provided' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Send the query
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    if (result.rowCount === 0) {
      // User not found
      res.status(401).json({ error: 'Insert unsuccesful...' });
      return;
    }

    res.status(200).json({ message: 'Account created' });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
