import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LessonList from "./pages/LessonList";
import Dashboard from "./pages/Dashboard";
import LessonDetail from "./pages/LessonDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import UserSetup from "./pages/UserSetup";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "./components/layout/BottomNavigation";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
      <CssBaseline />

      <Router>
        <div className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lessons"
              element={
                <ProtectedRoute>
                  <LessonList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/setup" element={<UserSetup />} />
            {/* <Route path="/signup2" element={<Signup2 />} />
        <Route path="/login2" element={<Login2 />} /> */}
            {/* <Route path="/lessons" element={<LessonList />} /> */}
            {/* <Route path="/" element={<Dashboard />} /> */}
          </Routes>
          <BottomNavigation />
        </div>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
