// ---------- backend/routes/auth.js ----------
console.log("Auth route loaded ✅");

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    // check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      accountNumber: Math.floor(Math.random() * 1000000000).toString()
    });

    await user.save();

    res.json({ message: "User registered", user });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN INPUT:", email, password);

    const cleanEmail = email.trim().toLowerCase();

const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

   if (password !== user.password) {
  return res.status(400).json({ message: "Invalid password" });
}
    console.log("Password match:", valid);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, 'secret');

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
