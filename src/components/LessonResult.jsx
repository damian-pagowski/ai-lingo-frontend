import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  // List,
  // ListItem,
  CardContent,
} from "@mui/material";
// import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ShareIcon from "@mui/icons-material/Share";

const LessonResult = ({ result }) => {
  result = {
    lessonId: 1,
    score: 50,
    totalQuestions: 10,
    correctAnswers: 5,
    topicProgress: {
      work: 20,
      travel: 10,
      general: 20,
    },
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFC107" }}>
        High scorer!
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 3 }}>
        You earned {result.score} Scores
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        {/* XP Card */}

        {/*  */}
        {Object.entries(result.topicProgress).map(([topic, score]) => (
          <Grid2 key={topic}>
            <Card
              sx={{
                bgcolor: "#4CAF50",
                color: "#fff",
                minWidth: 120,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  {topic.replace("_", " ")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} /> {score}%
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ mt: 4, mx: "auto" }}>
        <Button sx={{ mx: "auto", mb: 2 }} variant="outlined">
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default LessonResult;
