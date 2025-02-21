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

const WordArrangement = ({ data, selectedAnswer, setSelectedAnswer }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [question, setQuestion] = useState(null);
  // const [expected, setExpected] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  // const [borderColor, setBorderColor] = useState("grey.400");

  useEffect(() => {
    console.log(JSON.stringify(data));
    setRemainingWords(JSON.parse(data.options));
    setQuestion(data.question);
  }, [data]);

  const handleWordClick = useCallback(
    (word) => {
      if (selectedWords.includes(word)) {
        setSelectedWords((prev) => prev.filter((w) => w !== word));
        setRemainingWords((prev) => [...prev, word]);
      } else {
        setSelectedWords((prev) => [...prev, word]);
        setRemainingWords((prev) => prev.filter((w) => w !== word));
      }
      setSelectedAnswer(selectedWords);
    },
    [selectedWords]
  );

  return (
    <Box sx={{ py: 3, mx: "auto", bgcolor: "background.default" }}>
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
          // borderColor: borderColor,
          borderRadius: 1,
          transition: "border-color 0.3s ease",
        }}
      >
        {selectedWords.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onClick={() => handleWordClick(word)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Paper>

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {remainingWords.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onClick={() => handleWordClick(word)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Box>
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
