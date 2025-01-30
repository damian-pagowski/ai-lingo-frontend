import { useState, useEffect } from "react";
import Achievements from "../components/Achievements";
import { getUserProfile } from "../api/userApi";
import NextStep from "../components/NextStep";
import ProgressOverview from "../components/ProgressOverview";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';



const Dashboard2 = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = React.useState("dark");
  const defaultTheme = createTheme({ palette: { mode } });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const completedLessons = parseInt(user.progress.split("/")[0], 10);
  const totalLessons = parseInt(user.progress.split("/")[1], 10);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Stack
        sx={{
          justifyContent: "center",
          height: { xs: "100%", sm: "100dvh" },
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hi, {user.name} 👋
        </Typography>

        <Stack spacing={2}>
        <Typography variant="body1" gutterBottom>
          Current Course: {user.course_name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Learning Level: {user.level}
        </Typography>
        </Stack>
        <ProgressOverview
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          streak={user.streak}
        />

        {user.current_lesson_id > 0 && (
          <NextStep lessonId={user.current_lesson_id} />
        )}

        {completedLessons > 0 && (
          <Achievements
            completedLessons={user.completedLessons}
            totalLessons={user.totalLessons}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default Dashboard2;
