import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createLesson, createAiLesson } from "../api/lessonApi";

const CreateLesson = () => {
  const navigate = useNavigate();

  const handleCreateLesson = async () => {
    try {
      const lesson = await createLesson();
      navigate(`/lessons/${lesson.lessonId}`);
    } catch (error) {
      console.error("Failed to create lesson:", error);
      alert("Error creating lesson. Please try again.");
    }
  };

  const handleCreateLessonWithAI = async () => {
    try {
      const lesson = await createAiLesson();
      navigate(`/lessons/${lesson.lessonId}`);
    } catch (error) {
      console.error("Failed to create AI lesson:", error);
      alert("Error creating AI-generated lesson. Please try again.");
    }
  };

  return (
    <Card sx={{ my: 2, textAlign: "center", p: 2 }}>
      <CardContent>
        <CheckCircleIcon sx={{ fontSize: 100, color: "green", mb: 1 }} />
        <Typography gutterBottom variant="h6" component="div">
          All Planned Lessons Completed!
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          You have finished all the lessons planned for today. Want to keep learning?
        </Typography>
        <Divider sx={{ my: 1 }} />
      </CardContent>
      <CardActions sx={{ justifyContent: "center", gap: 1 }}>
        <Button variant="outlined" onClick={handleCreateLesson}>
          Create Lesson
        </Button>
        <Button variant="contained" onClick={handleCreateLessonWithAI}>
          Create with AI
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateLesson;