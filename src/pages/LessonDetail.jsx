import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLessonById, flagLesson } from "../api/lessonApi";
import {
  Typography,
  Stack,
  Button,
  Box,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { submitLessonProgress as submitAnswers } from "../api/progressApi";
import LessonResult from "../components/LessonResult";
import FlagIcon from "@mui/icons-material/Flag";
import VoteWidget from "../components/VoteWidget";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (result?.results) {
      setShowResult(true);
    }
  }, [result]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        setLesson(data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleAnswerChange = (exerciseId, value) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await submitAnswers(lesson.id, answers);
      setResult(result);
    } catch (error) {
      alert("Failed to submit progress. Try again.");
    }
  };

  const handleFlagLesson = async () => {
    try {
      await flagLesson(id);
      navigate("/lessons");
    } catch (error) {
      console.error("Failed to flag lesson:", error);
      alert("Failed to flag lesson. Try again.");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 1 }}>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h5" textAlign="center">
          {lesson.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            color="text.secondary"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Difficulty: {lesson.difficulty}
          </Typography>
          <IconButton onClick={handleFlagLesson} size="small" sx={{ ml: 2 }}>
            <FlagIcon />
          </IconButton>
        </Box>

        <Typography variant="h6">Exercises</Typography>

        {lesson.exercises.map((exercise) => (
          <Card key={exercise.id} sx={{ my: 0 }}>
            <CardContent>
              <Typography gutterBottom color="text.secondary" fontSize={14}>
                {exercise.question}
              </Typography>

              {exercise.type === "multiple_choice" ? (
                <RadioGroup
                  aria-labelledby="exercise-radio-group"
                  name={`exercise-${exercise.id}`}
                  onChange={(e) =>
                    handleAnswerChange(exercise.id, e.target.value)
                  }
                >
                  {JSON.parse(exercise.options).map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Radio />}
                      value={option}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <TextField
                  sx={{ my: 1 }}
                  type="text"
                  placeholder="Your answer"
                  fullWidth
                  onChange={(e) =>
                    handleAnswerChange(exercise.id, e.target.value)
                  }
                  variant="outlined"
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <VoteWidget exerciseId={exercise.id} score={exercise.score} />
              </Box>
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleSubmit}>
            Submit Answers
          </Button>
        </Box>

        <LessonResult
          result={result}
          open={showResult}
          onClose={() => setShowResult(false)}
        />
      </Stack>
    </Box>
  );
};

export default LessonDetail;
