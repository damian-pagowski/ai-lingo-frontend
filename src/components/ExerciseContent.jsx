

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const ExerciseContent = ({ exercise, onAnswerChange }) => {
    if (exercise.type === "multiple_choice") {
      return (
        <RadioGroup
          aria-labelledby="exercise-radio-group"
          name={`exercise-${exercise.id}`}
          onChange={(e) => onAnswerChange(exercise.id, e.target.value)}
        >
          {JSON.parse(exercise.options).map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Radio />}
              value={option}
              label={option}
            />
          ))}
        </RadioGroup>
      );
    }
  
    return (
      <TextField
        sx={{ my: 1 }}
        type="text"
        placeholder="Your answer"
        fullWidth
        onChange={(e) => onAnswerChange(exercise.id, e.target.value)}
        variant="outlined"
      />
    );
  };

  export default ExerciseContent;
