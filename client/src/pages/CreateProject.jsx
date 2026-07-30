import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [projectID] = useState(() => crypto.randomUUID());
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-header">
        <h1>HaaS Hub</h1>
      </header>

    <main className="login-page">
    <div className="login-box"> 
      <h1>Create Project</h1>

      <label>Project ID</label>
      <input
        type="text"
        value={projectID}
        readOnly
        disabled
      />

      <label>Project Name</label>
      <input
        type="text"
        placeholder="Enter project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <button onClick={() => console.log({ projectID, name: projectName, itemsChecked: 0 })}> Create Project
      </button>
      <button onClick={() => navigate("/projects")}>Cancel
      </button>
    </div>
    </main>
    </div>
  );
}

export default CreateProject;