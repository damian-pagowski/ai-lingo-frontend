import React from "react";
import {
  Typography,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import QuizIcon from "@mui/icons-material/Quiz";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { createLesson } from "../api/lessonApi";

const LessonList = () => {
  const navigate = useNavigate();

  const handleCreateLesson = async (types) => {
    try {
      const lesson = await createLesson(types);
      navigate(`/lessons/${lesson.lessonId}`);
    } catch (error) {
      console.error("Failed to create lesson:", error);
      alert("Error creating lesson. Please try again.");
    }
  };

  const lessonTypes = [
    {
      name: "Vocabulary",
      icon: <QuizIcon sx={{ color: "lightblue" }} />,
      types: ["multiple_choice"],
    },
    {
      name: "Listening",
      icon: <HeadphonesIcon sx={{ color: "lightblue" }} />,
      types: ["fill_in_the_blank", "word_arrangement"],
    },
    {
      name: "Speaking",
      icon: <RecordVoiceOverIcon sx={{ color: "lightblue" }} />,
      types: ["speaking"],
    },
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Header />
        <List>
          {lessonTypes.map(({ name, icon, types }) => (
            <ListItem
              onClick={() => handleCreateLesson(types)}
              key={name}
              sx={{
                bgcolor: "#2a2a2a",
                borderRadius: 2,
                mb: 2,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText primary={name} />
              <Avatar sx={{ bgcolor: "transparent",width: 56, height: 56 }} >{icon}</Avatar>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

const Header = () => (
  <Typography variant="h5" textAlign="center">
    Skills to Improve
  </Typography>
);

export default LessonList;
