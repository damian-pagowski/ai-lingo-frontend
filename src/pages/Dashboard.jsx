import DailyLessonStatus from "../components/DailyLessonStatus";
import ProgressOverview from "../components/ProgressOverview";
import { Stack, Typography, Box, CircularProgress, Alert } from "@mui/material";
import StreakCard from "../components/StreakCard";
import { useDashboard } from '../context/DashboardContext';

const Dashboard = () => {
  const { user, progress, loading, error } = useDashboard();

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
        <StreakCard />
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
