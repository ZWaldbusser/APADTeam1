
import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

      <button onClick={() => console.log(username, password)}> Login
      </button>
      <button onClick={() => navigate("/forgotpassword")}>Forgot Password?
      </button>
    </div>
    </main>
    </div>
  );
}

export default Login;
