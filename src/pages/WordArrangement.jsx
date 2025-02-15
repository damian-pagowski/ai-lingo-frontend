import { useState } from "react";
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

const WordArrangement = () => {
  const words = [
    "to",
    "passport",
    "July",
    "boots",
    "bright",
    "Does",
    "isn't",
    "in",
    "my",
    "sense",
    "it",
    "pack",
    "suitcase",
    "make",
    "the",
  ];

  const [selectedWords, setSelectedWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState(words);

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
      setRemainingWords([...remainingWords, word]);
    } else {
      setSelectedWords([...selectedWords, word]);
      setRemainingWords(remainingWords.filter((w) => w !== word));
    }
  };

  return (
    <Box
      sx={{ p: 3, maxWidth: 500, mx: "auto", bgcolor: "background.default" }}
    >
      <Typography variant="h6" gutterBottom>
        Translate this sentence
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <VolumeUpIcon color="primary" />

        <MessageBubble>
          <Typography variant="body1">
            Macht es Sinn, meinen Pass in den Koffer zu packen?
          </Typography>
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
          border: "1px solid",
          borderColor: "grey.400",
          borderRadius: 1,
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

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={selectedWords.length === 0}
      >
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
