const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // --- OPTIONAL: LOG REGISTRATIONS TOO ---
    console.log("NEW REGISTRATION ATTEMPT:", { name, email, password });

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: cleanEmail,
      password: hashed,
      accountNumber: Math.floor(Math.random() * 1000000000).toString()
    });

    await user.save();
    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 THIS IS THE MAGIC LINE FOR RENDER LOGS 🔥
    // This will print the exact email and password typed to your Render Dashboard
    console.log("LOGIN ATTEMPT CAPTURED:", { email, password });
    
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log("User not found in database:", cleanEmail);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch for user:", cleanEmail);
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber
      }
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;