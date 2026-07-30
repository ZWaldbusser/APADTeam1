import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProjectOverview from "./pages/ProjectOverview";
import AuthEntryPage from "./pages/AuthEntryPage";
import CreateUser from "./pages/CreateUser";
import ForgotPassword from "./pages/ForgotPassword";
import UserPortal from "./pages/UserPortal";
import CreateProject from "./pages/CreateProject";
import JoinProject from "./pages/JoinProject";
import PageHeader from "./components/PageHeader";

function App() {
  return (
    <BrowserRouter>
      <PageHeader title="HaaS Hub" />

      <Routes>
        <Route path="/" element={<AuthEntryPage />} />
        <Route path="/login" element={<Login />} /> {/*Communicating with DB*/}
        <Route path="/register" element={<CreateUser />} /> {/*Communicating with DB*/}
        <Route path="/projects" element={<ProjectOverview />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/*Communicating with DB*/}
        <Route path="/userportal" element={<UserPortal />} />
        <Route path="/createproject" element={<CreateProject />} /> {/*Communicating with DB*/}
        <Route path="/joinproject" element={<JoinProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
