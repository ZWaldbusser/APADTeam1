import { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { apiFetch, getCurrentUser } from "../api";

function CreateProject() {
  const [projectID, setProjectID] = useState("");
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

    const trimmedID = projectID.trim();
    const trimmedName = projectName.trim();

    if (!trimmedID) {
      setError("Project ID is required");
      return;
    }

    // Since projectID is used as a URL path segment (/api/projects/<project_id>),
    // keep it restricted to safe characters.
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedID)) {
      setError("Project ID can only contain letters, numbers, hyphens, and underscores");
      return;
    }

    if (!trimmedName) {
      setError("Project name is required");
      return;
    }

    try {
      const res = await apiFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({
          name: trimmedName,
          description,
          projectID: trimmedID,
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
      <main className="login-page">
        <div className="login-box">
          <h1>Create Project</h1>

          <label>Project ID</label>
          <input
            type="text"
            placeholder="Enter a unique project ID"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
          />

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