// pages/api/add-product.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { link, title, price, photo } = req.body;
    const photoBuffer = photo ? Buffer.from(photo, 'base64') : null;
    try {
      const result = await db.query(
        'INSERT INTO rh_products (link, title, price, photo) VALUES (?, ?, ?, ?)',
        [link, title, price, photoBuffer]
      );
      res.status(200).json({ message: 'Product added successfully' });
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