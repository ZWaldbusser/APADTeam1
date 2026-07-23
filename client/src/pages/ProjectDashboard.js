import { useNavigate } from "react-router-dom";

// TODO: replace mockProjects with API call once backend is ready
const mockProjects = [
  { projectID: "1", name: "Project 1", itemsChecked: 0 },
  { projectID: "2", name: "Project 2", itemsChecked: 2 },
];

function ProjectOverview() {
  const navigate = useNavigate();

  const handleCreateJoin = () => {
    navigate("/create-join");
  };

  const handleCheckoutHardware = (projectID) => {
    navigate(`/projects/${projectID}/resources`);
  };

  return (
    <div>
      <header>
        <h1>HAAS Hub</h1>
      </header>

      <main>
        <div>
          <h2>Projects</h2>
          <button onClick={handleCreateJoin}>Create/Join Project</button>
        </div>

        <div>
          {mockProjects.map((project) => (
            <div key={project.projectID}>
              <span>{project.name}</span>
              <span>
                {project.itemsChecked} Items Checked |{" "}
                <button onClick={() => handleCheckoutHardware(project.projectID)}>
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