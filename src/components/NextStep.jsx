import PropTypes from "prop-types";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NextStep = ({ lessonId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Suggested Next Step
      </h2>
      <p className="text-gray-700">
        Continue with your next lesson to maintain your streak.
      </p>
      <Button
        onClick={() => navigate(`/lessons/${lessonId}`)}
        className="mt-4 bg-blue-500 hover:bg-blue-600"
      >
        Continue Lesson
      </Button>
    </div>
  );
};

NextStep.propTypes = {
  lessonId: PropTypes.number.isRequired,
};

export default NextStep;