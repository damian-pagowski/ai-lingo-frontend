import { useState, useEffect } from "react";
import { getLessons } from "../api/lessonApi";
import LessonCard from "../components/LessonCard";
import CreateLesson from "../components/CreateLesson";
import { Typography, Stack, Box, CircularProgress, Alert } from "@mui/material";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessons();
        setLessons(data);
      } catch (_err) {
        setError("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  const notStartedLessons = lessons.filter((lesson) => lesson.status === "not_started");

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2 , mb:4}}>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign="center">
          Learn Today
        </Typography>

        {notStartedLessons.length === 0 && <CreateLesson />}

        {lessons
          .sort((a, b) => (a.status === "not_started" ? -1 : 1))
          .map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
      </Stack>
    </Box>
  );
};

export default LessonList;