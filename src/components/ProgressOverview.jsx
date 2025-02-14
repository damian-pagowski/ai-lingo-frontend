import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useDashboard } from "../context/DashboardContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";

const ProgressOverview = () => {
  const { progress, loading, error } = useDashboard();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Card sx={{ my: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Overall Progress
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Score: {progress.overallScore}%
        </Typography>

        {Object.entries(progress.topicScores).map(([topic, data]) => (
          <Box key={topic} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize" }}
            >
              {topic.replace("_", " ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Score: {data.score} / {data.maxScore} ({data.percentage}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(data.percentage, 100)}
              sx={{ height: 8, borderRadius: 4, mt: 1 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
