import { Box, Typography, List, ListItem, ListItemText, Radio, Paper } from "@mui/material";

const MultipleChoice = ({ data, selectedAnswer, setSelectedAnswer }) => {
  const options = JSON.parse(data.options);

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
              onClick={() => setSelectedAnswer(option)}
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: selectedAnswer === option ? "primary.main" : "grey.600",
                borderRadius: 1,
                mb: 1,
                py: 1,
                px: 2,
              }}
            >
              <Radio checked={selectedAnswer === option} color="primary" />
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MultipleChoice;