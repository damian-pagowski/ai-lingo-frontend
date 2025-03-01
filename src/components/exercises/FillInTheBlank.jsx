import { Box, Typography, TextField, Paper, Avatar } from "@mui/material";

const FillInTheBlank = ({
  data,
  selectedAnswer,
  setSelectedAnswer,
  isCorrect,
}) => {
  const expected = data.correct_answer;
  return (
    <Box sx={{ py: 3, mx: "auto", bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Avatar src="/character.png" alt="Q" sx={{ width: 60, height: 60 }} />
        <Paper
          sx={{ p: 2, borderRadius: 2, bgcolor: "grey.800", color: "white" }}
        >
          <Typography variant="body1">{data.question}</Typography>
        </Paper>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: isCorrect != null ? (isCorrect ? "success.main" : "error.main") : "primary.main"
        }}
      >
        { (isCorrect != null && selectedAnswer != expected )  && <Typography variant="h6" gutterBottom>{expected}</Typography>}
        <TextField
          variant="standard"
          fullWidth
          placeholder="Type your answer..."
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
};

export default FillInTheBlank;
