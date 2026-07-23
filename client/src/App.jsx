

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectOverview from "./pages/ProjectDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
