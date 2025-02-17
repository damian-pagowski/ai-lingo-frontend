import { useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";
import { getExerciseById } from "../../api/exerciseApi";

const MatchingPairs = ({ exercise }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongAttempt, setWrongAttempt] = useState([]);
  const [question, setQuestion] = useState([]);
  const [solution, setSolution] = useState([]);
  // TODO remove later
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  // TODO replace with passed props
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exercise = await getExerciseById(98);
        setSolution(JSON.parse(exercise.correct_answer));
        setQuestion(JSON.parse(exercise.options));
      } catch (err) {
        console.error("Failed to fetch exercise:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, []);

  const handleSelect = (word, column) => {
    setWrongAttempt([]);

    if (column === "left") {
      setSelectedLeft(word === selectedLeft ? null : word);
      setSelectedRight(null);
    } else {
      setSelectedRight(word);
      if (selectedLeft) {
        const correctMatch = solution.find(
          (pair) => pair.left === selectedLeft && pair.right === word
        );

        if (correctMatch) {
          setMatchedPairs([...matchedPairs, selectedLeft]);
          setSelectedLeft(null);
          setSelectedRight(null);
        } else {
          setWrongAttempt([selectedLeft, word]); 
          setSelectedLeft(null);
          setSelectedRight(null);
        }
      }
    }
  };


  // TODO remove later
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box sx={{ mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Tap the matching pairs
      </Typography>

      <Grid2 container spacing={2}>
        {/* Left Column */}
        <Grid2 item xs={6}>
          {question.map(({ left }) => (
            <Paper
              key={left}
              onClick={() => handleSelect(left, "left")}
              sx={{
                p: 2,
                mb: 1,
                cursor: matchedPairs.includes(left) ? "default" : "pointer",
                textAlign: "center",
                bgcolor: matchedPairs.includes(left) ? "lightgreen" : "inherit",
                border: matchedPairs.includes(left)
                  ? "2px solid green"
                  : wrongAttempt.includes(left)
                  ? "2px solid red"
                  : selectedLeft === left
                  ? "2px solid blue"
                  : "1px solid gray",
                pointerEvents: matchedPairs.includes(left) ? "none" : "auto",
              }}
            >
              {left}
            </Paper>
          ))}
        </Grid2>

        {/* Right Column */}
        <Grid2 item xs={6}>
          {question.map(({ right, left }) => (
            <Paper
              key={right}
              onClick={() => handleSelect(right, "right")}
              sx={{
                p: 2,
                mb: 1,
                cursor: matchedPairs.includes(left) ? "default" : "pointer",
                textAlign: "center",
                bgcolor: matchedPairs.includes(left) ? "lightgreen" : "inherit",
                border: matchedPairs.includes(left)
                  ? "2px solid green"
                  : wrongAttempt.includes(right)
                  ? "2px solid red"
                  : selectedRight === right
                  ? "2px solid blue"
                  : "1px solid gray",
                pointerEvents: matchedPairs.includes(left) ? "none" : "auto",
              }}
            >
              {right}
            </Paper>
          ))}
        </Grid2>
      </Grid2>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={matchedPairs.length !== question.length}
      >
        CONTINUE
      </Button>
    </Box>
  );
};

export default MatchingPairs;
