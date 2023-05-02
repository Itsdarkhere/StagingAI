import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  const { email, password } = req.body;

  try {
    // Fetch the user and their hashed password from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (result.rowCount === 0) {
      // User not found
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Verify the submitted password against the stored hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (isPasswordCorrect) {
      // Password is correct, issue a JWT
      const id = result.rows[0].id;
      res
        .status(200)
        .json({ is_success: true, message: 'Login successful', id, email });
    } else {
      // Incorrect password
      res
        .status(401)
        .json({ is_success: false, error: 'Invalid email or password' });
    }
  } catch (err: any) {
    res.status(500).json({ is_success: false, error: err.message });
  }
}
