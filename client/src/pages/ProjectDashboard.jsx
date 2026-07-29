import { useNavigate } from "react-router-dom";
import "../styles/ProjectDashboard.css";

// TODO: Add backend functionality 
//TODO: Create components

const mockProjects = [
  { projectID: "1", name: "Project 1", itemsChecked: 0 },
  { projectID: "2", name: "Project 2", itemsChecked: 2 },
];

function ProjectDashboard() {
  const navigate = useNavigate();

  const handleCreateJoin = () => {
    navigate("/create-join");
  };

  const handleCheckoutHardware = (projectID) => {
    navigate(`/projects/${projectID}/resources`);
  };

return (
  <div>
    <header className="page-header">
      <h1>Haas Hub</h1>
    </header>

    <main className="page-main">
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="create-join-btn" onClick={handleCreateJoin}>Create/Join Project</button>
      </div>

      <div className="project-list">
        {mockProjects.map((project) => (
          <div className="project-row" key={project.projectID}>
            <span>{project.name}</span>
            <span>
              {project.itemsChecked} Items Checked |{" "}
              <button className="checkout-btn" onClick={() => handleCheckoutHardware(project.projectID)}>Checkout Hardware</button>
            </span>
          </div>
        ))}
      </div>
    </main>
  </div>
); 

}

export default ProjectDashboard;