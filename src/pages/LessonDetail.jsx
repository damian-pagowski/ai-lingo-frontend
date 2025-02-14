import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Stack,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { getLessonById, flagLesson } from "../api/lessonApi";
import { submitLessonProgress as submitAnswers } from "../api/progressApi";
import LessonResult from "../components/LessonResult";
import { useLessons } from "../context/LessonsContext";
import { useDashboard } from '../context/DashboardContext';
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import ExercisesList from "../components/ExercisesList";
const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({});
  const [showResult, setShowResult] = useState(false);
  const { refreshLessons } = useLessons();
  const { refreshDashboard } = useDashboard();

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
      await refreshLessons();
      await refreshDashboard();
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
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 1 }}>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <LessonHeader lesson={lesson} onFlagLesson={handleFlagLesson} />
        <ExercisesList lesson={lesson} onAnswerChange={handleAnswerChange} />
        <SubmitButton onClick={handleSubmit} />
        <LessonResult
          result={result}
          open={showResult}
          onClose={() => setShowResult(false)}
        />
      </Stack>
    </Box>
  );
};

const LessonHeader = ({ lesson, onFlagLesson }) => (
  <>
    <Typography variant="h5" textAlign="center">
      {lesson.title}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <Typography color="text.secondary" sx={{ flexGrow: 1, textAlign: "center" }}>
        Difficulty: {lesson.difficulty}
      </Typography>
      <IconButton onClick={onFlagLesson} size="small" sx={{ ml: 2 }}>
        <FlagIcon />
      </IconButton>
    </Box>
  </>
);

const SubmitButton = ({ onClick }) => (
  <Box display="flex" justifyContent="center">
    <Button variant="contained" onClick={onClick}>
      Submit Answers
    </Button>
  </Box>
);

export default LessonDetail;
