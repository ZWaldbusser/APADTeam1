import { useState } from "react";
import "../styles/Login.css";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log(username, password);
  };

  return (
    <div>
      <header className="page-header">
        <h1>HaaS Hub</h1>
      </header>

      <main className="login-page">
        <div className="login-box">
          <h1>Forgot Password</h1>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleSubmit}>Reset Password</button>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;