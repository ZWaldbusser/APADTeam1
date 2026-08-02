import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import ProjectOverview from "./pages/ProjectDashboard";
import LandingPage from "./pages/LandingPage";
import CreateUser from "./pages/CreateUser";
import ForgotPassword from "./pages/ForgotPassword";
import UserPortal from "./pages/UserPortal";
import CreateProject from "./pages/CreateProject";
import JoinProject from "./pages/JoinProject";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/projects" element={
            <ProtectedRoute><ProjectOverview /></ProtectedRoute>
          } />
          <Route path="/userportal" element={
            <ProtectedRoute><UserPortal /></ProtectedRoute>
          } />
          <Route path="/createproject" element={
            <ProtectedRoute><CreateProject /></ProtectedRoute>
          } />
          <Route path="/joinproject" element={
            <ProtectedRoute><JoinProject /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;