// pages/api/add-product.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { category } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO rh_categories (category) VALUES (?)',
        [category]
      );
      res.status(200).json({ message: 'Se ha añadido la categoría' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}