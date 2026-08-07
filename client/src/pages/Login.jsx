import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ userid: username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      login(data.token);
      navigate("/projects");
    } catch (err) {
      setError("Could not reach server");
    }
  };

  return (
    <div>
      <main className="login-page">
        <div className="login-box">
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate("/forgotpassword")}>
            Forgot Password?
          </button>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      </main>
    </div>
  );
}

export default Login;