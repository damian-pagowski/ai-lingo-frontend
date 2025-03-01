import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Box, LinearProgress } from "@mui/material";
import FeedbackSpeedDial from "../components/FeedbackSpeedDial";
import {
  getNextLessonExercise,
  getLessonSummary,
  submitExerciseAnswer,
} from "../api/lessonApi";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import MultipleChoice from "../components/exercises/MultipleChoice";
import FillInTheBlank from "../components/exercises/FillInTheBlank";
import MatchingPairs from "../components/exercises/MatchingPairs";
import WordArrangement from "../components/exercises/WordArrangement";
import LessonResult from "../components/LessonResult";

const LessonDetail = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [lessonSummary, setLessonSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    fetchNextExercise();
  }, [id]);

  const fetchNextExercise = async () => {
    try {
      setLoading(true);
      const response = await getNextLessonExercise(id);

      if (response) {
        setCurrentExercise(response.exercise);
        setCurrentIndex(response.currentIndex);
        setTotalExercises(response.totalExercises);
        setSelectedAnswer(null);
        setIsChecked(false);
        setIsCorrect(null);
      }

      if (response.currentIndex === response.totalExercises) {
        setLessonCompleted(true);
      }
    } catch (error) {
      setError("Failed to load lesson exercise.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer) return;

    try {
      const response = await submitExerciseAnswer(id, currentExercise.id, {
        answer: selectedAnswer,
      });
      setIsCorrect(response.isCorrect);
      setIsChecked(true);
    } catch (error) {
      setError("Failed to submit answer.");
    }
  };

  const handleContinue = async () => {
    if (lessonCompleted) {
      try {
        const summary = await getLessonSummary(id);
        setIsChecked(false);
        setLessonSummary(summary);
      } catch (error) {
        setError("Failed to load lesson summary.");
      }
    } else {
      fetchNextExercise();
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <LessonHeader current={currentIndex} total={totalExercises} />

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
        {lessonSummary ? (
          <LessonResult result={lessonSummary} />
        ) : (
          currentExercise && (
            <>
              {currentExercise.type === "multiple_choice" && (
                <MultipleChoice
                  data={currentExercise}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}
                  isCorrect={isCorrect}
                />
              )}
              {currentExercise.type === "fill_in_the_blank" && (
                <FillInTheBlank
                  data={currentExercise}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}
                  isCorrect={isCorrect}

                />
              )}
              {currentExercise.type === "word_arrangement" && (
                <WordArrangement
                  data={currentExercise}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}
                />
              )}
              {currentExercise.type === "match_pairs" && (
                <MatchingPairs
                  data={currentExercise}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}
                />
              )}
            </>
          )
        )}
      </Box>

      {!lessonSummary && <FeedbackSpeedDial exerciseId={currentExercise.id} />}
      {/* Bottom Buttons */}
      <Box
        sx={{
          width: "100%",
          p: 2,
          bgcolor: "background.default",
          display: "flex",
          gap: 1,
        }}
      >
        {!lessonSummary && (
          <Button
            variant="contained"
            fullWidth
            onClick={isChecked ? handleContinue : handleCheckAnswer}
            disabled={!selectedAnswer}
          >
            {isChecked
              ? lessonCompleted
                ? "VIEW SUMMARY"
                : "CONTINUE"
              : "CHECK"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const LessonHeader = ({ current, total }) => (
  <Box display="flex" alignItems="center" gap={2} p={2}>
    <LinearProgress
      variant="determinate"
      value={(current / total) * 100}
      sx={{ flexGrow: 1 }}
    />
  </Box>
);

export default LessonDetail;
