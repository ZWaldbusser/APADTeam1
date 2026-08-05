import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

function JoinProject() {
  const [projectID, setProjectID] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    setError("");
    try {
      const res = await apiFetch(`/api/projects/${projectID}/join`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not join project");
        return;
      }
      navigate("/projects");
    } catch (err) {
      setError("Could not reach server");
    }
  };

  return (
    <div>
      <main className="login-page">
        <div className="login-box">
          <h1>Join Project</h1>

          <label>Project ID</label>
          <input
            type="text"
            placeholder="Enter project ID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button onClick={handleJoin}>Join Project</button>
          <button onClick={() => navigate("/projects")}>Cancel</button>
        </div>
      </main>
    </div>
  );
}

export default JoinProject;