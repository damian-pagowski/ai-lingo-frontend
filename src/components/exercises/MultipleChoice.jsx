import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Radio,
  Button,
  Paper,
} from "@mui/material";
import { getExerciseById } from "../../api/exerciseApi";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";

const MultipleChoice = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [expected, setExpected] = useState(null);
  // TODO remove later
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exercise = await getExerciseById(2);
        setExpected(exercise.correct_answer);
        setOptions(JSON.parse(exercise.options));
        setQuestion(exercise.question);

      } catch (err) {
        console.error("Failed to fetch exercise:", err);
        setError(err.message)
      }finally{
        setLoading(false);
      }
    };

    fetchExercise();
  }, []);




  // TODO remove later
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }


  const checkResult = () => {
    if (selectedOption === expected) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {question}
      </Typography>

      <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
        <List>
          {options.map((option, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleSelect(option)}
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor:
                  selectedOption === option ? "primary.main" : "grey.600",
                borderRadius: 1,
                mb: 1,
                py: 1,
                px: 2,
              }}
            >
              <Radio
                checked={selectedOption === option}
                onChange={() => handleSelect(option)}
                color="primary"
              />
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!selectedOption}
        onClick={checkResult}
      >
        CONTINUE
      </Button>
    </Box>
  );
};

export default MultipleChoice;
