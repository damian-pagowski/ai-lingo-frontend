import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Gauge } from "@mui/x-charts/Gauge";
import { useDashboard } from "../context/DashboardContext";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";

const DailyLessonStatus = () => {
  const navigate = useNavigate();
  const {user, error, loading} = useDashboard()
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <Card sx={{ p: 1, mt: 2, mb:1, textAlign: "center" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Daily Lesson Progress
        </Typography>

        <Typography variant="body1">
          {user.completedLessonsCount} / {user.daily_lesson_commitment} lessons
          completed
        </Typography>

        <Gauge
          width={100}
          value={ Math.ceil(user.completedLessonsCount/ user.daily_lesson_commitment * 100)}
          height={100}
        />

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/lessons/`)}
        >
          Take a Lesson
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyLessonStatus;
