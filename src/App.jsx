import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNavigation from "./components/layout/BottomNavigation";
import Dashboard from "./pages/Dashboard";
import LessonList from "./pages/LessonList";
import LessonDetail from "./pages/LessonDetail";
import Profile from "./pages/Profile";
import UserSetup from "./pages/UserSetup";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Box } from "@mui/material";
import UserRankingScreen from "./pages/Ranking";

const App = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        m: 1,
      }}
    >
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
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
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <LessonDetail />
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
          path="/setup"
          element={
            <ProtectedRoute>
              <UserSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <ProtectedRoute>
              <UserRankingScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <BottomNavigation />
    </Box>
  );
};

export default App;
