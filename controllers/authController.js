const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/singup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password
  });
  try {
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24
    });
    res.json({
      auth: true,
      token
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send('Email not found');
  }
  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    return res.status(401).json({
      auth: false,
      token: null
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24
  });
  res.json({
    auth: true,
    token
  });
});

module.exports = router;
