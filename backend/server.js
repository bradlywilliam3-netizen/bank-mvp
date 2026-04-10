const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// test route
app.get('/', (req, res) => {
  res.send('Server is working ✅');
});

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/bank_mvp')
  .then(() => {
    console.log('MongoDB Connected ✅');
  })
  .catch(err => {
    console.log('DB Error ❌', err);
  });

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

// start server
app.listen(5000, () => {
  console.log('Server running on port 5000 🚀');
});
