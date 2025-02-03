import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DoneIcon from '@mui/icons-material/Done';

const LessonCard = ({ lesson }) => {
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate(`/lessons/${lesson.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 , my:2}}>
      <CardMedia
        sx={{ height: 140 }}
        image="public/school.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {lesson.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Difficulty: {lesson.difficulty}
        </Typography>
        <Divider sx={{ my: 1 }}></Divider>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {lesson.content}
        </Typography>
      </CardContent>
      <CardActions>
        {lesson.status == "completed" ? (
          <DoneIcon sx={{ mx: 'auto'}}/>
        ) : (
          <Button sx={{ mx: 'auto'}}
          size="small" onClick={handleStartLesson}>
            Start Lesson
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LessonCard;
