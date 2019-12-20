const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireUser = async (req, res, next) => {
  const token = req.headers['x-acces-token'];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.userId = decoded.id;
  const user = await User.findById(decoded.id, { password: 0 });

  if (!user) {
    return res.status(404).send('No user found');
  }
  next();
};

module.exports = requireUser;
