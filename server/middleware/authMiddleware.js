const jwt = require('jsonwebtoken');
const SECRET_KEY = 'some_key'; // Replace with a secure key or move to environment variables

const logsService = require('../services/logsService');
const usersService = require('../services/usersService');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token synchronously
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token verified');

    // Perform user action logic
    const userActionResult = await usersService.userActionTaken(decoded.id);
    if (userActionResult.error) {
      return res.status(userActionResult.status).json({ error: userActionResult.error });
    }

    // Log the user's action
    await logsService.logActions(userActionResult);

    // Attach decoded user data and updated user info to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error in verifyToken middleware:', err.message);
    // Handle token-related errors and other issues
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = verifyToken;
