import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  // Log the entire incoming headers to verify if Authorization header is sent
  console.log('Authorization Header:', req.headers.authorization);

  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
  console.log('Token:', token);  // Log the extracted token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode and verify the token
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};
