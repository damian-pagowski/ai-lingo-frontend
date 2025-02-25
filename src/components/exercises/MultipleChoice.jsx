import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Radio,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

const MultipleChoice = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  isCorrect,
}) => {
  const options = JSON.parse(data.options);
  const expected = data.correct_answer;

  useEffect(() => {
    console.log(JSON.stringify(data));
    console.log("isCorrect: " + isCorrect);
    // console.log("isChecked: " + isChecked)
    // console.log("isRevealed: " + isRevealed)
  }, [isCorrect]);

  const handleOnClick = (opt) => {
    //
    // setIsRevealed(true)
    setSelectedAnswer(opt);
  };

  return (
    <Box
      sx={{
        py: 3,
        maxWidth: 400,
        mx: "auto",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {data.question}
      </Typography>

      <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
        <List>
          {options.map((option, index) => (
            <ListItem
              key={index}
              onClick={() => isCorrect === null  && handleOnClick(option)}
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor:
                  selectedAnswer === option
                    ? isCorrect != null
                      ? selectedAnswer == expected
                        ? "success.main"
                        : "error.main"
                      : "primary.main"
                    : option === expected && isCorrect != null
                    ? "success.main"
                    : "grey.600",
                borderRadius: 1,
                mb: 1,
                py: 1,
                px: 2,
              }}
            >
              <Radio
                checked={selectedAnswer === option}
                color="primary"
              />
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MultipleChoice;
