import { useState } from "react";
import "../styles/Login.css";

function ForgotPassword() {
  const [userID, setUserID] = useState("");
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
      <main className="login-page">
        <div className="login-box">
          <h1>Forgot Password</h1>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
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

          <button onClick={async () =>{
            try {
              const response = await window.fetch('/api/forgot_password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userID: userID, password: password, confirmPassword: confirmPassword})
              });
              const data = await response.json();
              console.log(data);
            } catch (error){
              console.error('Login failed. ', error);
            }
          }}>Reset Password</button>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;