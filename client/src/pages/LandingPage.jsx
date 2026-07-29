import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
 
export default function LandingPage() {
  const navigate = useNavigate();
 
  return (
    <div>
        <header className="page-header">
            <h1>Haas Hub</h1>
        </header>

        <main className="landing-page">
        <h1>
            Welcome to the HaaS Hub!
        </h1>

      <div className="nav-box">
        <button onClick={() => navigate("/login")}>
          Log In
        </button>
        <button onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
      </main>
    </div>
  );
}