import { useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";

// const MatchingPairs = ({ data, handleResult }) => {
  const MatchingPairs = ({ data, selectedAnswer, setSelectedAnswer }) => {

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongAttempt, setWrongAttempt] = useState([]);
  const [question, setQuestion] = useState([]);
  const [solution, setSolution] = useState([]);
  // const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    setSolution(JSON.parse(data.correct_answer));
    setQuestion(JSON.parse(data.options));
  }, [data]);

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
          setMatchedPairs([...matchedPairs, { left: selectedLeft, right: word }]);
          setSelectedLeft(null);
          setSelectedRight(null);
        } else {
          setWrongAttempt([selectedLeft, word]);
          setSelectedLeft(null);
          setSelectedRight(null);
        }
      }
    }
    setSelectedAnswer(matchedPairs);
  };

  // const checkIfSolved = () => {
  //   return (
  //     matchedPairs.length === solution.length &&
  //     matchedPairs.every(({ left, right }) =>
  //       solution.some((pair) => pair.left === left && pair.right === right)
  //     )
  //   );
  // };

  // const submitHandler = () => {
  //   const isCorrect = checkIfSolved();
  //   setHideButton(true);
  //   handleResult(data.id, isCorrect);
  // };

  return (
    <Box sx={{ width: "100%", height: "100%", textAlign: "center", p: 0, m: 0 }}>
      <Typography variant="h6" gutterBottom>
        Tap the matching pairs
      </Typography>

      <Grid2 container spacing={0} sx={{ width: "100%", boxSizing: "border-box" , m:0, p:0}}>
        {/* Left Column */}
        <Grid2 item xs={6} sx={{ p: 0, m: 0 }}>
          {question.map(({ left }) => (
            <Paper
              key={left}
              onClick={() => handleSelect(left, "left")}
              sx={{
                p: 1,
                mb: 1,
                cursor: matchedPairs.some((pair) => pair.left === left) ? "default" : "pointer",
                textAlign: "center",
                width: "100%",
                bgcolor: matchedPairs.some((pair) => pair.left === left) ? "lightgreen" : "inherit",
                border: matchedPairs.some((pair) => pair.left === left)
                  ? "2px solid green"
                  : wrongAttempt.includes(left)
                  ? "2px solid red"
                  : selectedLeft === left
                  ? "2px solid blue"
                  : "1px solid gray",
                pointerEvents: matchedPairs.some((pair) => pair.left === left) ? "none" : "auto",
              }}
            >
              {left}
            </Paper>
          ))}
        </Grid2>

        {/* Right Column */}
        <Grid2 item xs={6} sx={{ p: 0, m: 0 }}>
          {question.map(({ right }) => (
            <Paper
              key={right}
              onClick={() => handleSelect(right, "right")}
              sx={{
                p: 1,
                mb: 1,
                cursor: matchedPairs.some((pair) => pair.right === right) ? "default" : "pointer",
                textAlign: "center",
                width: "100%",
                bgcolor: matchedPairs.some((pair) => pair.right === right) ? "lightgreen" : "inherit",
                border: matchedPairs.some((pair) => pair.right === right)
                  ? "2px solid green"
                  : wrongAttempt.includes(right)
                  ? "2px solid red"
                  : selectedRight === right
                  ? "2px solid blue"
                  : "1px solid gray",
                pointerEvents: matchedPairs.some((pair) => pair.right === right) ? "none" : "auto",
              }}
            >
              {right}
            </Paper>
          ))}
        </Grid2>
      </Grid2>

      {/* {!hideButton && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={matchedPairs.length !== solution.length}
          onClick={submitHandler}
        >
          CHECK
        </Button>
      )} */}
    </Box>
  );
};

export default MatchingPairs;