import { useState } from "react";
import "../styles/ProjectDashboard.css";

const mockUser = {
  username: "testuser",
  password: "Password123",
};

function UserPortal() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <main className="page-main">
        <div className="projects-header">
          <h2>User Portal</h2>
        </div>

        <div className="project-list">
          <div className="project-row">
            <span>Username</span>
            <span>{mockUser.username}</span>
          </div>

          <div className="project-row">
            <span>Password</span>
            <span>
              {showPassword ? mockUser.password : "•".repeat(mockUser.password.length)}{" "}
              <button
                className="checkout-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserPortal;