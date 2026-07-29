import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectOverview from "./pages/ProjectDashboard";
import LandingPage from "./pages/LandingPage";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/projects" element={<ProjectOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
