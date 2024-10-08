// pages/api/add-product.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { link, name, order, photo, featured } = req.body;
    console.log(link, name, order, featured )
    const photoBuffer = photo ? Buffer.from(photo, 'base64') : null;
    try {
      const result = await db.query(
        'INSERT INTO rh_providers (`link`, `name`, `order`, `photo`, `featured`) VALUES (?, ?, ?, ?, ?)',
        [link, name, order, photoBuffer, featured]
      );
      res.status(200).json({ message: 'Se ha añadido el producto' });
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