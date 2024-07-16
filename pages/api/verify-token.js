// pages/api/verify-token.js
import { verifyToken } from '../../lib/auth';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(200).json({ userId: decoded.userId });
}
