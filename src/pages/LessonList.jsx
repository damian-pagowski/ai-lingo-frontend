import { useState, useEffect } from "react";
import { getLessons } from "../api/lessonApi";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessons();
        setLessons(data);
      } catch (err) {
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
      

      <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
        Your Learning Plan
      </h1>
      <div className="mb-6 text-center">
        <span className="text-lg font-medium text-gray-700">
          Current Progress: 1/18 Lessons Completed
        </span>
        <div className="relative w-full bg-gray-300 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: "5%" }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-5 rounded-lg shadow-md border border-gray-300 bg-white ${
              lesson.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-20 h-20 rounded-lg flex items-center justify-center text-xl font-bold text-white ${
                  lesson.completed ? "bg-gray-400" : "bg-blue-500"
                }`}
              >
                Lesson {lesson.id}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-gray-800">
                  {lesson.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {lesson.description}
                </p>
                <button className="text-blue-500 font-medium hover:underline">
                  Read More
                </button>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              {lesson.completed ? (
                <button className="text-green-600 font-bold">
                  ✔ Completed
                </button>
              ) : (
                <button className="text-gray-400 font-bold cursor-not-allowed">
                  🔒 Locked
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
