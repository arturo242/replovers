import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { category_id } = req.query;
    try {
      let title = "%" + req.query.title + "%";
      if(category_id){
        const [rows] = await db.query('SELECT * FROM rh_products WHERE category_id = ? AND title LIKE ?', [category_id, title]);
        res.status(200).json(rows);
      }else{
        const [rows] = await db.query("SELECT * FROM rh_products WHERE title like ?", [title]);
        res.status(200).json(rows);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
