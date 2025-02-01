import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Gauge } from '@mui/x-charts/Gauge';

const LessonResult = ({ score, exercisesNumber, open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate('/lessons');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="lesson-result-title"
      aria-describedby="lesson-result-description"
    >
      <DialogTitle id="lesson-result-title">
        Lesson Completed!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="lesson-result-description">
          Your score is <strong>{score}</strong>
          <Gauge width={100} height={100} value={score} />

        </DialogContentText>
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