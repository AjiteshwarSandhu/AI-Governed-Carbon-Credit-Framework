import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import SubmitProject from "./pages/SubmitProject";
import Projects from "./pages/Projects";
import Credits from "./pages/Credits";
import Validators from "./pages/Validators";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/submit"
            element={<SubmitProject />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/credits"
            element={<Credits />}
          />

          <Route
            path="/validators"
            element={<Validators />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;