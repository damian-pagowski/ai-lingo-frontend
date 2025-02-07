import { useState, useEffect } from "react";
import { getLessons } from "../api/lessonApi";
import LessonCard from "../components/LessonCard";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CreateLesson from "../components/CreateLesson"; 

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
      <div className="text-center mt-20 text-gray-500">Loading lessons...</div>
    );
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  const notStartedLessons = lessons.filter((lesson) => lesson.status === "not_started");


  return (
    <Stack>

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mx: "auto",
          mb: 2,
        }}
      >
        Learn Today
      </Typography>
      {notStartedLessons.length == 0 && <CreateLesson />}
      {lessons
        .sort((a, b) => (a.status === "not_started" ? -1 : 1))
        .map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
    </Stack>
  );
};

export default LessonList;
