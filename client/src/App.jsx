

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectOverview from "./pages/ProjectDashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
