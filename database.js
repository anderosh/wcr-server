const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.DB_CREDENTIALS;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
