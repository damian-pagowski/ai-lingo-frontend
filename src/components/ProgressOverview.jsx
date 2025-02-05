import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BorderLinearProgress from "@mui/material/LinearProgress";

const ProgressOverview = ({ progress }) => {
  if (!progress) return null;

  return (
    <Card sx={{ minWidth: 275, p: 1, my: 1 }}>
      <CardContent >
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Overall Progress
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
           Score: {progress.overallScore}%
        </Typography>

        {Object.entries(progress.topicScores).map(([topic, data]) => (
          <div key={topic} style={{ marginBottom: "16px" }}>
            <Typography
              variant="subtitle1"
              sx={{ textTransform: "capitalize" }}
            >
              {topic.replace("_", " ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Score: {data.score} / {data.maxScore} ({data.percentage}%)
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={Math.min(data.percentage, 100)}
              sx={{ height: 8, borderRadius: 4, mt: 1 }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default ProgressOverview;
