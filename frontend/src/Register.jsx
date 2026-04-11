import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://bank-mvp.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/"); // Redirect to login page
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Could not connect to the server.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Full Name:</label>
          <input
            type="text"
            required
            style={{ width: "100%", padding: "8px" }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            required
            style={{ width: "100%", padding: "8px" }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            required
            style={{ width: "100%", padding: "8px" }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", background: "blue", color: "white" }}>
          Register
        </button>
      </form>
      
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/">Log in here</Link>
      </p>
    </div>
  );
}