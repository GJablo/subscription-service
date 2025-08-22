import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authorize = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      const error = new Error('No token provided');
      error.statusCode = 401;
      throw error;
    }
    // Verify token (pseudo-code)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access',
      error: error.message
    });
    next(error);
  }
}

export default authorize;
