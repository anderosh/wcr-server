const { Router } = require('express');
const router = Router();
const Message = require('../models/Message');
const User = require('../models/User');
const requireUser = require('../middleware/requireUser');

router.get('/get-messages', requireUser, async (req, res) => {
  try {
    const messages = await Message.find().sort({
      creation_date: -1
    });
    res.json(messages);
  } catch (err) {
    console.log(err);
  }
});

router.post('/new-message', requireUser, async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });
  try {
    const newMessage = {
      userId: req.userId,
      date: new Date(),
      username: user.username,
      message: req.body.message
    };
    const message = await Message.create(newMessage);
    res.json(message);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = router;
