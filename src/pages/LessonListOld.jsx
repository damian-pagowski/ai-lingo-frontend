import React from 'react';
import { useLessons } from "../context/LessonsContext";
import LessonCard from "../components/LessonCard";
import CreateLesson from "../components/CreateLesson";
import { Typography, Stack, Box } from "@mui/material";
import LoadingIndicator from "../components/LoadingIndicator";
// import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
 
const LessonList = () => {
  const navigate = useNavigate();

  const { lessons, loading, error } = useLessons();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    // return <ErrorMessage error={error} />;
    navigate("/");

  }

  const notStartedLessons = lessons.filter(lesson => lesson.status === "not_started");
  const sortedLessons = lessons.sort((a, b) => (a.status === "not_started" ? -1 : 1));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Header />
        {notStartedLessons.length === 0 && <CreateLesson />}
        {sortedLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </Stack>
    </Box>
  );
};

const Header = () => (
  <Typography variant="h5" textAlign="center">
    Learn Today
  </Typography>
);

export default LessonList;
