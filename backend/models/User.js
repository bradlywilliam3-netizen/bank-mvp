// ---------- backend/models/User.js ----------

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 1000 },
  accountNumber: String
});

module.exports = model('User', UserSchema);