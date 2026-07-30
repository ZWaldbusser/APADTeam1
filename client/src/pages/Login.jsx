import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/projects");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("Could not reach the server. Make sure the backend is running.");
      console.error(error);
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

          <button onClick={handleLogin}>Login</button>
          {message ? <p>{message}</p> : null}
          <button onClick={() => navigate("/forgotpassword")}>Forgot Password?</button>
        </div>
      </main>
    </div>
  );
}

export default Login;
