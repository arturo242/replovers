// pages/api/users.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { category_id } = req.query;
    try {
      if(category_id){
        const [rows] = await db.query('SELECT * FROM rh_products WHERE category_id = ? ORDER BY `order`', [category_id]);
        res.status(200).json(rows);
      }else{
        const [rows] = await db.query('SELECT * FROM rh_products ORDER BY `order`');
        res.status(200).json(rows);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
