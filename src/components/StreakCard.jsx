import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "0 auto",
  textAlign: "center",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
  padding: theme.spacing(2),
}));

const StreakValue = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.success.dark,
}));

const StreakCard = () => {
  const { user, loading, error } = useDashboard();

  const getMotivationMessage = () => {
    if (user.current_streak === 0) return "Start your learning journey!";
    if (user.current_streak <= 3) return "Keep going! 🔥";
    return "Amazing streak! 🚀";
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <StyledCard elevation={3}>
      <CardContent aria-labelledby="streak-heading">
        <Typography
          variant="h6"
          component="h2"
          id="streak-heading"
          gutterBottom
        >
          Learning Streak
        </Typography>

        <StreakValue variant="h4" component="div">
          {user.current_streak} Day{user.current_streak !== 1 && "s"}
        </StreakValue>

        <Typography variant="body1" color="text.secondary">
          {getMotivationMessage()}
        </Typography>

        <Box mt={2}>
          <Typography variant="body2" component="div">
            Longest Streak: {user.longest_streak} Days
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default StreakCard;
