import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BorderLinearProgress from "@mui/material/LinearProgress";

const ProgressOverview = ({ completedLessons, totalLessons, streak }) => {
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">Your Progress</Typography>
        <Typography variant="body2">
          Lessons Completed: {completedLessons}/{totalLessons}
        </Typography>
        <BorderLinearProgress variant="determinate" value={progressPercentage} />
        <Typography variant="body2">🔥 Streak: {streak} days</Typography>
      </CardContent>
    </Card>
  );
};
ProgressOverview.propTypes = {
  completedLessons: PropTypes.number.isRequired,
  totalLessons: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
};

export default ProgressOverview;
