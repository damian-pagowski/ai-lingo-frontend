import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LessonCard = ({ lesson }) => {
  const navigate = useNavigate();

  const handleStartLesson = () => {
    navigate(`/lessons/${lesson.id}`);
  };

  return (
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
          <h4 className="text-lg font-bold text-gray-800">{lesson.title}</h4>
          <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
          <button className="text-blue-500 font-medium hover:underline">
            Read More
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        {lesson.status === "not_started" ? (
          <button
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleStartLesson}
          >
            Start Lesson
          </button>
        ) : lesson.completed ? (
          <button className="text-green-600 font-bold">✔ Completed</button>
        ) : (
          <button className="text-gray-400 font-bold cursor-not-allowed">
            🔒 Locked
          </button>
        )}
      </div>
    </div>
  );
};
LessonCard.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default LessonCard;