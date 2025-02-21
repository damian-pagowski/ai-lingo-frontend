import { Box, Typography, TextField, Paper, Avatar } from "@mui/material";

const FillInTheBlank = ({ data, selectedAnswer, setSelectedAnswer }) => {
  return (
    <Box sx={{ py: 3, mx: "auto", bgcolor: "background.default" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Avatar src="/character.png" alt="Q" sx={{ width: 60, height: 60 }} />
        <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "grey.800", color: "white" }}>
          <Typography variant="body1">{data.question}</Typography>
        </Paper>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>{data.options}</Typography>
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