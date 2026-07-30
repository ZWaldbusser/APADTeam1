import { useNavigate } from "react-router-dom";
import "../styles/ProjectDashboard.css";

const mockProjects = [
  { projectID: "1", name: "Project 1", itemsChecked: 0 },
  { projectID: "2", name: "Project 2", itemsChecked: 2 },
];

function ProjectOverview() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/createproject");
  };
  const handleJoin = () => {
    navigate("/joinproject");
  };

  const handleCheckoutHardware = (projectID) => {
    navigate(`/projects/${projectID}/resources`);
  };

  return (
    <div>
      <main className="page-main">
        <div className="projects-header">
          <h2>Projects</h2>
          <div align="right">
            <button className="create-join-btn" onClick={handleCreate}>
            Create Project
            </button>
            &nbsp;
            <button className="create-join-btn" onClick={handleJoin}>
              Join Project
            </button>
          </div>
          
        </div>

        <div className="project-list">
          {mockProjects.map((project) => (
            <div className="project-row" key={project.projectID}>
              <span>{project.name}</span>
              <span>
                {project.itemsChecked} Items Checked |{" "}
                <button
                  className="checkout-btn"
                  onClick={() => handleCheckoutHardware(project.projectID)}
                >
                  Checkout Hardware
                </button>
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProjectOverview;