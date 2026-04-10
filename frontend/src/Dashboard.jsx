import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/transactions/${user.email}`)
      .then((res) => setTransactions(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome {user.name}</h2>
      <h3>Balance: ${user.balance}</h3>

      <h3>Transactions</h3>

      {transactions.map((tx) => (
        <div key={tx._id}>
          {tx.sender} → {tx.receiver} : ${tx.amount}
        </div>
      ))}
    </div>
  );
}
