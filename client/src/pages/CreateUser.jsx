import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button onClick={async () =>{
            setErrorMessage("");
            if (password !== confirmPassword) {
              setErrorMessage("Passwords do not match");
              return;
            }
            try {
              const response = await window.fetch('/api/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userID: userID, password: password})
              });
              const data = await response.json();
              if (response.ok) {
                navigate("/login");
              } else {
                setErrorMessage(data.error || "Signup failed");
              }
            } catch (error){
              setErrorMessage("Network error. Please try again.");
            }
          }}> Create Account</button>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      </main>
    </div>
  );
}

export default CreateUser;