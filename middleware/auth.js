const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // Check if token is provided
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "You are not logged in. Please log in to get access." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "The user belonging to this token no longer exists." });
    }

    // Add user to request
    req.user = currentUser;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token or no token provided." });
  }
};

module.exports = {
  auth
}
