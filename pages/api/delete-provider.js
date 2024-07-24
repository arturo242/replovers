// pages/api/add-product.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    try {
      const result = await db.query(
        'DELETE FROM rh_providers WHERE id = ?',
        [id]
      );
      res.status(200).json({ message: 'Se ha eliminado el proveedor' });
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