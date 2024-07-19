// pages/api/edit-product.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {id, link, title, price, category_id } = req.body;
    // const photoBuffer = photo ? Buffer.from(photo, 'base64') : null;
    try {
      const result = await db.query(
        //update
        'UPDATE rh_products SET link = ?, title = ?, price = ?, category_id = ? WHERE id = ?',
        [link, title, price, category_id, id]
      );
      res.status(200).json({ message: 'Se ha actualizado el producto' });
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