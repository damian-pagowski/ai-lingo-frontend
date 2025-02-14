import ExerciseContent from "./ExerciseContent";
import {Card , Box}from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VoteWidget from "./VoteWidget";

const ExercisesList = ({ lesson, onAnswerChange }) => (
  <>
    <Typography variant="h6">Exercises</Typography>
    {lesson.exercises.map((exercise) => (
      <Card key={exercise.id} sx={{ my: 0 }}>
        <CardContent>
          <Typography gutterBottom color="text.secondary" fontSize={14}>
            {exercise.question}
          </Typography>
          <ExerciseContent
            exercise={exercise}
            onAnswerChange={onAnswerChange}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <VoteWidget
              exerciseId={exercise.id}
              score={exercise.score}
              sx={{ width: "auto" }}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </>
);

export default ExercisesList;
