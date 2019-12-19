const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  userId: String,
  username: String,
  date: String,
  message: String
});

module.exports = model('Message', messageSchema);
