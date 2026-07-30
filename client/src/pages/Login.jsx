
import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
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
          if (response.ok) {
            navigate("/projects");
          }
          
        } catch (error){
          console.error('Login failed. ', error);
        }
      }}> Login
      </button>
      <button onClick={() => navigate("/forgotpassword")}>Forgot Password?
      </button>
    </div>
    </main>
    </div>
  );
}

export default Login;
