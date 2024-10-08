import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const [rows] = await db.query('SELECT * FROM rh_products where id = ?', [id]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
