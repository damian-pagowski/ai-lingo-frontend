import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Chip,
  Stack,
  Paper,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { getExerciseById } from "../../api/exerciseApi";

const WordArrangement = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [question, setQuestion] = useState(null);
  const [expected, setExpected] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const [borderColor, setBorderColor] = useState("grey.400");

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const exercise = await getExerciseById(97);
        setExpected(JSON.parse(exercise.correct_answer));
        setRemainingWords(JSON.parse(exercise.options));
        setQuestion(exercise.question);
      } catch (err) {
        console.error("Failed to fetch exercise:", err);
      }
    };

    fetchExercise();
  }, []);

  const answerCheckHandler = useCallback(() => {
    const isCorrect =
      selectedWords.length === expected.length &&
      selectedWords.every((word, index) => word === expected[index]);

    setBorderColor(isCorrect ? "success.main" : "error.main");
  }, [selectedWords, expected]);

  const handleWordClick = useCallback(
    (word) => {
      if (selectedWords.includes(word)) {
        setSelectedWords((prev) => prev.filter((w) => w !== word));
        setRemainingWords((prev) => [...prev, word]);
      } else {
        setSelectedWords((prev) => [...prev, word]);
        setRemainingWords((prev) => prev.filter((w) => w !== word));
      }
    },
    [selectedWords]
  );

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto", bgcolor: "background.default" }}>
      <Typography variant="h6" gutterBottom>
        Translate this sentence
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <VolumeUpIcon color="primary" />
        <MessageBubble>
          <Typography variant="body1">{question}</Typography>
        </MessageBubble>
      </Stack>

      <Paper
        sx={{
          minHeight: 50,
          mt: 2,
          p: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          border: "2px solid",
          borderColor: borderColor,
          borderRadius: 1,
          transition: "border-color 0.3s ease",
        }}
      >
        {selectedWords.map((word, index) => (
          <Chip key={index} label={word} onClick={() => handleWordClick(word)} sx={{ cursor: "pointer" }} />
        ))}
      </Paper>

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {remainingWords.map((word, index) => (
          <Chip key={index} label={word} onClick={() => handleWordClick(word)} sx={{ cursor: "pointer" }} />
        ))}
      </Box>

      <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={answerCheckHandler}>
        CHECK
      </Button>
    </Box>
  );
};

const MessageBubble = styled(Card)(() => ({
  maxWidth: "90%",
  padding: "12px 16px",
  borderRadius: "16px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

export default WordArrangement;