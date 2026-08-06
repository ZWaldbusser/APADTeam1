import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
          <h1>Register User</h1>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
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

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={async () =>{
            try {
              const response = await window.fetch('/api/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userID: userID, password: password})
              });
              const data = await response.json();
              console.log(data);
              if (response.ok) {
                navigate("/login");
              }
            } catch (error){
              console.error('Login failed. ', error);
            }
          }}> Create Account</button>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      </main>
    </div>
  );
}

export default CreateUser;