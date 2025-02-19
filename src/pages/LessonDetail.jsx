import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getLessonById } from "../api/lessonApi";
import { useLessons } from "../context/LessonsContext";
import { useDashboard } from "../context/DashboardContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import MultipleChoice from "../components/exercises/MultipleChoice";
import FillInTheBlank from "../components/exercises/FillInTheBlank";
import MatchingPairs from "../components/exercises/MatchingPairs";
import WordArrangement from "../components/exercises/WordArrangement";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const { refreshLessons } = useLessons();
  const { refreshDashboard } = useDashboard();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const data = await getLessonById(id);
        setLesson(data);
        setCurrentIndex(0);
        setCurrentExercise(data.exercises[0]);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  useEffect(() => {
    if (lesson && lesson.exercises) {
      setCurrentExercise(lesson.exercises[currentIndex]);
    }
  }, [currentIndex, lesson]);

  const handleSubmit = async () => {
    console.log(JSON.stringify(answers));
    // TODO implement API call
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  const exerciseResultHandler = (exerciseId, result) => {
    console.log("EXERCISE: " + exerciseId + " : " + result);
    setAnswers((prev) => ({ ...prev, [exerciseId]: result }));
  };

  const handleNext = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <LessonHeader current={currentIndex + 1} total={lesson.exercises.length} />

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        {currentExercise && (
          <>
            {currentExercise.type === "multiple_choice" && (
              <MultipleChoice data={currentExercise} handleResult={exerciseResultHandler} />
            )}
            {currentExercise.type === "fill_in_the_blank" && (
              <FillInTheBlank data={currentExercise} handleResult={exerciseResultHandler} />
            )}
            {currentExercise.type === "word_arrangement" && (
              <WordArrangement data={currentExercise} handleResult={exerciseResultHandler} />
            )}
            {currentExercise.type === "match_pairs" && (
              <MatchingPairs data={currentExercise} handleResult={exerciseResultHandler} />
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 0,
          bgcolor: "background.default",
          boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          gap: 1,
        }}
      >
        {currentIndex < lesson.exercises.length - 1 ? (
          <Button variant="contained" onClick={handleNext} sx={{ flex: 1 }}>
            NEXT
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit} sx={{ flex: 1 }}>
            SUBMIT
          </Button>
        )}
      </Box>
    </Box>
  );
};

const LessonHeader = ({ current, total }) => (
  <Box display="flex" alignItems="center" gap={2} p={2}>
    <IconButton onClick={() => window.history.back()} sx={{ color: "inherit" }}>
      <CloseIcon />
    </IconButton>
    <LinearProgress variant="determinate" value={(current / total) * 100} sx={{ flexGrow: 1 }} />
  </Box>
);

export default LessonDetail;