// ---------- backend/models/Transaction.js ----------

const TransactionSchema = new Schema({
  sender: String,
  receiver: String,
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = model('Transaction', TransactionSchema);
