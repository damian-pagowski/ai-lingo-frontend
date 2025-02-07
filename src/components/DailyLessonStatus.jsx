import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLessonTracking } from "../api/progressApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Gauge } from "@mui/x-charts/Gauge";

const DailyLessonStatus = ({ lessonId }) => {
  const navigate = useNavigate();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonTracking = async () => {
      try {
        const data = await getLessonTracking();
        setTracking(data);
      } catch (err) {
        console.error("Error fetching lesson tracking:", err);
        setError("Failed to load daily progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonTracking();
  }, []);

  if (loading) return <Typography>Loading daily progress...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card sx={{ p: 1, mt: 2, mb:1, textAlign: "center" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Daily Lesson Progress
        </Typography>

        <Typography variant="body1">
          {tracking.lessonsCompleted} / {tracking.dailyCommitment} lessons
          completed
        </Typography>

        <Gauge
          width={100}
          value={Math.min(tracking.completionPercentage, 100)}
          height={100}
        />

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/lessons/${lessonId}`)}
        >
          Start Lesson
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyLessonStatus;
