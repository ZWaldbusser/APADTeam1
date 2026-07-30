import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [projectID] = useState(() => crypto.randomUUID());
  const [owner, setOwner] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const navigate = useNavigate();

  return (
    <div>

    <main className="login-page">
    <div className="login-box"> 
      <h1>Create Project</h1>

      <label>owner</label>
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

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
      <label>Project Description</label>
      <input
        type="text"
        placeholder="Enter project name"
        value={projectDesc}
        onChange={(e) => setProjectDesc(e.target.value)}
      />

      <button onClick={async () =>{
        try {
          const response = await window.fetch('/api/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            /*owner will later result from the login token*/
            body: JSON.stringify({"owner": owner, "projectID": projectID, "name": projectName, "description": projectDesc})
          });
          const data = await response.json();
          console.log(data);
        } catch (error){
          console.error('Project creation failed. ', error);
        }
      }}> Create Project
      </button>


      <button onClick={() => navigate("/projects")}>Cancel
      </button>
    </div>
    </main>
    </div>
  );
}

export default CreateProject;