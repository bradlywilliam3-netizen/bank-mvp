import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bankLogo from "./assets/bank-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Logo */}
      <div style={styles.logoBox}>
       <img src={bankLogo} alt="Bank Logo" style={styles.logo} />
      </div>

      {/* Input Box */}
      <div style={styles.inputBox}>
        <label style={styles.label}>Bank ID</label>
        <input
          style={styles.input}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={styles.inputBox}>
        <div style={styles.passwordRow}>
          <label style={styles.label}>Password</label>
          <span style={styles.forgot}>Forgot?</span>
        </div>
        <input
          type="password"
          style={styles.input}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Remember toggle */}
      <div style={styles.rememberRow}>
        <span>Remember login</span>
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
      </div>

      {/* Login Button */}
      <button style={styles.button} onClick={handleLogin}>
        Log in
      </button>

      {/* Secondary Button */}
      <button style={styles.secondaryButton}>
        Log in with branch, account and PIN
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "350px",
    margin: "auto",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  logo: {
  width: "80px",
  height: "80px",
  objectFit: "contain",
},
  inputBox: {
    background: "#f5f5f5",
    borderRadius: "12px",
    padding: "10px",
    marginBottom: "15px",
  },
  label: {
    fontSize: "12px",
    color: "#555",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "16px",
  },
  passwordRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  forgot: {
    color: "#1a73e8",
    fontSize: "12px",
    cursor: "pointer",
  },
  rememberRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "#ddd",
    marginBottom: "15px",
    cursor: "pointer",
  },
  secondaryButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "1px solid #1a73e8",
    background: "white",
    color: "#1a73e8",
    cursor: "pointer",
  },
};
