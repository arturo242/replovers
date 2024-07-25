// pages/api/products-search.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { category_id, title = "", page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit;
    const searchTitle = "%" + title + "%";

    try {
      let query = 'SELECT * FROM rh_products WHERE title LIKE ?';
      let countQuery = 'SELECT COUNT(*) AS total FROM rh_products WHERE title LIKE ?';
      let params = [searchTitle];

      if (category_id) {
        query += ' AND category_id = ?';
        countQuery += ' AND category_id = ?';
        params.push(category_id);
      }

      query += ' ORDER BY `order` LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      const [rows] = await db.query(query, params);
      const [[{ total }]] = category_id ? await db.query(countQuery, [searchTitle, category_id]) : await db.query(countQuery, [searchTitle]);

      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        data: rows
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
