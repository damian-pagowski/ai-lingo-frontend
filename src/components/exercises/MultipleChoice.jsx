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

const MultipleChoice = ( {data, handleResult}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [expected, setExpected] = useState(null);
  const [hideButton, setHideButton] = useState(false);


  useEffect(() => {
    console.log(JSON.stringify(data))
    setExpected(data.correct_answer);
    setOptions(JSON.parse(data.options));
    setQuestion(data.question);
  }, [data]);

  const checkResult = () => {
    const result =  (selectedOption === expected);
    handleResult(data.id, result)
    setHideButton(true);

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
        {question}
      </Typography>

      <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
        <List>
          {options.map((option, index) => (
            <ListItem
              key={index}
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

      {!hideButton && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={!selectedOption}
          onClick={checkResult}
        >
          CHECK
        </Button>
      )}
    </Box>
  );
};

export default MultipleChoice;
