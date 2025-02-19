import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        textAlign: "center",
        p: 3,
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFC107" }}>
        High scorer!
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, mb: 3 }}>
        You earned {result.score} Scores
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {Object.entries(result.topicProgress).map(([topic, score]) => (
          <Grid item key={topic}>
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
          </Grid>
        ))}
      </Grid>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
        <Button variant="outlined" fullWidth sx={{ py: 1.5 }}>
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default LessonResult;