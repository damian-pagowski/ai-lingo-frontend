import DailyLessonStatus from "../components/DailyLessonStatus";
import ProgressOverview from "../components/ProgressOverview";
import { Stack, Typography, Box } from "@mui/material";
import StreakCard from "../components/StreakCard";
import { useDashboard } from "../context/DashboardContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
 
const Dashboard = () => {
  const navigate = useNavigate();

  const { user, loading, error } = useDashboard();
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    navigate("/");
    // return <ErrorMessage error={error} />;

  }
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Greeting userName={user?.name} />
        <CourseInfo courseName={user?.course_name} />
        <StreakCard />
        <DailyLessonStatus />
        <ProgressOverview />
      </Stack>
    </Box>
  );
};

const Greeting = ({ userName }) => (
  <Typography variant="h5" textAlign="center">
    Hi, {userName || "User"} 👋
  </Typography>
);

const CourseInfo = ({ courseName }) => (
  <Typography variant="body1" textAlign="center">
    Current Course: {courseName || "Not Assigned"}
  </Typography>
);

export default Dashboard;
