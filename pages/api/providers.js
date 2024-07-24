// pages/api/users.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { featured } = req.query;
    try {
      if(featured){
        const [rows] = await db.query('SELECT * FROM rh_providers WHERE featured = "1" ORDER BY "order"');
        res.status(200).json(rows);
      }else{
        const [rows] = await db.query('SELECT * FROM rh_providers ORDER BY "order", "featured"');
        res.status(200).json(rows);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
