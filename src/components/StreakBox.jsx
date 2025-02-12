import { Box, Typography, Card, CardContent } from "@mui/material";

const StreakBox = ({ streak, longestStreak }) => {
  return (
    <Card
      sx={{
        mx: "auto",
        my: 1,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Streak 🔥
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {streak} Days
        </Typography>
        <Typography color="text.secondary">
          {streak > 3 ? "🔥 Keep it up!" : "Let's build a streak!"}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            Longest Streak: {longestStreak} Days
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StreakBox;