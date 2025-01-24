import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLessonById } from '../api/lessonApi';
import Button from '../components/Button';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        setLesson(data);
      } catch (err) {
        console.log(err)
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleAnswerChange = (exerciseId, value) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = () => {
    alert(`Submitted Answers: ${JSON.stringify(answers)}`);
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading lesson...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{lesson.title}</h1>
      <p className="text-lg text-gray-700 mb-6">Difficulty: {lesson.difficulty}</p>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lesson Content</h2>
        <p className="text-gray-700 mb-4">{lesson.content}</p>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900">Exercises</h3>
      {lesson.exercises.map((exercise) => (
        <div key={exercise.id} className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <p className="text-lg text-gray-800 mb-2">{exercise.question}</p>
          {exercise.type === 'multiple_choice' ? (
            <div className="space-y-2">
              {JSON.parse(exercise.options).map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={`exercise-${exercise.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(exercise.id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Your answer"
              onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 mt-4">
        Submit Answers
      </Button>

      <div className="mt-6 flex justify-between">
        <Button onClick={() => navigate(`/lessons/${parseInt(id) - 1}`)}>← Previous</Button>
        <Button onClick={() => navigate('/lessons')} className="bg-gray-500 hover:bg-gray-600">
          Back to Lessons
        </Button>
        <Button onClick={() => navigate(`/lessons/${parseInt(id) + 1}`)}>Next →</Button>
      </div>
    </div>
  );
};

export default LessonDetail;
