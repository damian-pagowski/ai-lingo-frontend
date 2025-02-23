import { Routes, Route } from "react-router-dom";
import { DashboardProvider } from "./context/DashboardContext";
import { LessonsProvider } from "./context/LessonsContext";

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
import { RankingProvider } from "./context/RankingContext";
import { PreferencesProvider } from "./context/PreferencesContext";
import WordArrangement from "./components/exercises/WordArrangement";
import MatchingPairs from "./components/exercises/MatchingPairs"
import MultipleChoice from "./components/exercises/MultipleChoice";
import FillInTheBlank from "./components/exercises/FillInTheBlank";
const App = () => {
  return (
    <DashboardProvider>
      <LessonsProvider>
        <RankingProvider>
          <PreferencesProvider>
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
                <Route path="/q1" element={<WordArrangement />} />
                <Route path="/q2" element={<MatchingPairs />} />
                <Route path="/q3" element={<MultipleChoice />} />
                <Route path="/q4" element={<FillInTheBlank />} />

                
              </Routes>
              <BottomNavigation />
            </Box>
          </PreferencesProvider>
        </RankingProvider>
      </LessonsProvider>
    </DashboardProvider>
  );
};

export default App;
