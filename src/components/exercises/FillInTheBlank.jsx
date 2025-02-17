import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import { getExerciseById } from "../../api/exerciseApi"; // Adjust the import path as needed

const FillInTheBlank = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState("");
  const [options, setOptions] = useState(null);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exercise = await getExerciseById(1);
        setSolution(exercise.correct_answer);
        setOptions(exercise.options);

        setQuestion((exercise.question));
      } catch (err) {
        console.error("Failed to fetch exercise:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, []);

  const checkResult = () => {
    if (answer.trim() === solution) {
      alert("Correct!");
    } else {
      alert("Try again!");
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          mb: 2,
        }}
      >
        <Avatar
          src="/character.png"
          alt="Q"
          sx={{ width: 60, height: 60 }}
        />
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "grey.800",
            color: "white",
          }}
        >
          <Typography variant="body1">
            {question}
          </Typography>
        </Paper>
      </Box>

      {/* Fill-in-the-blank Sentence */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
        {options}
        </Typography>

        <TextField
          variant="standard"
          fullWidth
          placeholder="Type your answer..."
          value={answer}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Paper>

      {/* Continue Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!answer.trim()}
        onClick={checkResult}
      >
        CONTINUE
      </Button>
    </Box>
  );
};

export default FillInTheBlank;
