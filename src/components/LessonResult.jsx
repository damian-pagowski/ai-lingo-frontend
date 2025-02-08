import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

const LessonResult = ({ result, open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate("/lessons");
  };
  console.log(JSON.stringify(result));
  if (!(result && result.topicProgress)) {
    return;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="lesson-result-title"
      aria-describedby="lesson-result-description"
    >
      <DialogTitle id="lesson-result-title">Lesson Completed!</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Your Score: {result.score}%
        </Typography>

        <Gauge
          width={100}
          value={result.correctAnswers / result.totalQuestions * 100}
          height={100}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Topic Progress:
        </Typography>
        <List>
          {Object.entries(result.topicProgress).map(([topic, score]) => (
            <ListItem key={topic}>
              <Typography>
                - {topic.replace("_", " ")}: {score}%
              </Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonResult;
