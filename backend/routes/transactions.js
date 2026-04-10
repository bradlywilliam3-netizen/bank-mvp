const router = require('express').Router();

router.get('/:email', (req, res) => {
  const email = req.params.email;

  const transactions = [
    {
      _id: 1,
      sender: "bank",
      receiver: email,
      amount: 1000
    },
    {
      _id: 2,
      sender: email,
      receiver: "shop",
      amount: 200
    }
  ];

  res.json(transactions);
});

module.exports = router;
