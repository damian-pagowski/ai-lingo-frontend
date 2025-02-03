import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLessonById } from "../api/lessonApi";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { submitLessonProgress } from "../api/progressApi";
import LessonResult from "../components/LessonResult";

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        setLesson(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  useEffect(() => {
    console.log(JSON.stringify(lesson));
  }, [lesson]);

  const handleAnswerChange = (exerciseId, value) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await submitLessonProgress(lesson.id, answers);
      setScore(result.score);
      setShowResult(true);
    } catch (error) {
      alert("Failed to submit progress. Try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">Loading lesson...</div>
    );
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <Stack
      sx={{
        justifyContent: "center",
        height: { xs: "100%", sm: "100dvh" },
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mx: "auto",
          mb: 2,
        }}
      >
        {lesson.title}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        Difficulty: {lesson.difficulty}
      </Typography>

      <Typography variant="h6">Exercises</Typography>

      {lesson.exercises.map((exercise) => (
        <Card key={exercise.id} sx={{ my: 2 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {exercise.question}
            </Typography>

            {/* 🔹 Removed Typography here - FIXED */}
            {exercise.type === "multiple_choice" ? (
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {JSON.parse(exercise.options).map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Radio />}
                    value={option}
                    label={option}
                    onChange={() => handleAnswerChange(exercise.id, option)}
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
          </CardContent>
        </Card>
      ))}

      <Box sx={{ mb: 4, mx: "auto" }}>
        <Button onClick={handleSubmit}>Submit Answers</Button>
      </Box>
      <LessonResult
        score={score}
        exercisesNumber={lesson.exercises.length}
        open={showResult}
        onClose={() => setShowResult(false)}
      />
    </Stack>
  );
};

export default LessonDetail;
