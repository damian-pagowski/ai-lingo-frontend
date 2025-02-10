import { useState, useEffect } from "react";
import { getDashboard } from "../api/dashboardApi";
import DailyLessonStatus from "../components/DailyLessonStatus";
import ProgressOverview from "../components/ProgressOverview";
import { Stack, Typography, Box, CircularProgress, Alert } from "@mui/material";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await getDashboard();
        setUser(dashboard.user || {});
        setProgress(dashboard.progress || {});
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign="center">
          Hi, {user?.name || "User"} 👋
        </Typography>

        <Typography variant="body1" textAlign="center">
          Current Course: {user?.course_name || "Not Assigned"}
        </Typography>

        <DailyLessonStatus
          daily_lesson_commitment={user.daily_lesson_commitment}
          completedLessonsCount={user.completedLessonsCount}
        />

        {progress && <ProgressOverview progress={progress} />}
      </Stack>
    </Box>
  );
};

export default Dashboard;
