import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
} from "@mui/material";

const FillInTheBlank = ({ data, handleResult }) => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState("");
  const [options, setOptions] = useState(null);
  const [hideButton, setHideButton] = useState(false);

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setSolution(data.correct_answer);
    setOptions(data.options);
    setQuestion(data.question);
  }, [data]);

  const checkResult = () => {
    const result = answer.trim() === solution;
    setHideButton(true);
    handleResult(data.id, result);
  };

  return (
    <Box
      sx={{
        py: 3,
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
        <Avatar src="/character.png" alt="Q" sx={{ width: 60, height: 60 }} />
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "grey.800",
            color: "white",
          }}
        >
          <Typography variant="body1">{question}</Typography>
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
      {!hideButton && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={!answer.trim()}
          onClick={checkResult}
        >
          CHECK
        </Button>
      )}
    </Box>
  );
};

export default FillInTheBlank;
