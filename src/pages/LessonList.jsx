import { useState, useEffect } from "react";
import { getLessons } from "../api/lessonApi";
import LessonCard from "../components/LessonCard";

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      

      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
      Learn Today
      </h1>
      <div className="space-y-6">
        { 
        lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonList;
