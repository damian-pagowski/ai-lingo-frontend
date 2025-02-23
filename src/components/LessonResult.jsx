import React, { useEffect } from "react";
import { useLessons } from "../context/LessonsContext";
import { useRanking } from "../context/RankingContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const LessonResult = ({ result }) => {
  const navigate = useNavigate();
  const { refreshLessons } = useLessons();
  const { refreshRanking } = useRanking();

  useEffect(() => {
    refreshLessons();
    refreshRanking();
  }, []);

  if (!result) return null;

  const formatTopicName = (topic) => {
    return topic
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: "center",
        p: 3,
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFC107" }}>
        Lesson Completed!
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
        You earned {result.totalScore} points
      </Typography>

      <Typography variant="body1">
        Correct: {result.correctAnswers} / Incorrect: {result.incorrectAnswers}
      </Typography>

      {/* Topic Breakdown */}
      <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        {result.topicBreakdown.map(({ topic, accuracy }) => (
          <Grid2 item key={topic}>
            <Card
              sx={{
                bgcolor: accuracy > 0 ? "#4CAF50" : "grey.600",
                color: "#fff",
                minWidth: 120,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  {formatTopicName(topic)}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} /> {accuracy}%
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ py: 1.5 }}
          onClick={() => navigate("/lessons")}
        >
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default LessonResult;
