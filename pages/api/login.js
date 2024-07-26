// pages/api/login.js
import db from '../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM rh_users WHERE name = ?',[name]);
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid name or password' });
      }

      const user = rows[0];
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid name or password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
