import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

// TODO: Add backend functionality — look up project by projectID and add user to it

function JoinProject() {
  const [projectID, setProjectID] = useState("");
  const navigate = useNavigate();

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

      <button onClick={() => console.log({ projectID })}> Join Project
      </button>
      <button onClick={() => navigate("/projects")}>Cancel
      </button>
    </div>
    </main>
    </div>
  );
}

export default JoinProject;