import { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { apiFetch, getCurrentUser } from "../api";

function CreateProject() {
  const [projectID] = useState(() => crypto.randomUUID());
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setOwner(user.id);
    }
    loadUser();
  }, [navigate]);

  const handleCreate = async () => {
    setError("");
    try {
      const res = await apiFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({
          name: projectName,
          description,
          projectID,
          owner,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create project");
        return;
      }
      navigate("/projects");
    } catch (err) {
      setError("Could not reach server");
    }
  };

  return (
    <div>
      <header className="page-header">
        <h1>HaaS Hub</h1>
      </header>

      <main className="login-page">
        <div className="login-box">
          <h1>Create Project</h1>

          <label>Project ID</label>
          <input type="text" value={projectID} readOnly disabled />

          <label>Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button onClick={handleCreate} disabled={!owner}>Create Project</button>
          <button onClick={() => navigate("/projects")}>Cancel</button>
        </div>
      </main>
    </div>
  );
}

export default CreateProject;