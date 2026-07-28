
import { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="login-page">
    <div className="login-box"> 
      <h1>Login</h1>

      <label>UserID</label>
      <input
        type="text"
        placeholder="Enter userID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={async () =>{
        try {
          const response = await window.fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID: userID, password: password})
          });
          const data = await response.json();
          console.log(data);
        } catch (error){
          console.error('Login failed. ', error);
        }
      }}> Login
      </button>
    </div>
    </main>
  );
}

export default Login;
