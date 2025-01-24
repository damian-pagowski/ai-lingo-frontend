import { useParams } from 'react-router-dom';
import { useState } from 'react';

const LessonExercise = () => {
  const { id } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = [
    { id: 1, question: 'What is the German word for "doctor"?', options: ['Arzt', 'Haus', 'Auto'], answer: 'Arzt' },
    { id: 2, question: 'How do you say "hospital" in German?', options: ['Schule', 'Krankenhaus', 'Buch'], answer: 'Krankenhaus' },
  ];

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [questionIndex]: option });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert('Exercise completed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Lesson {id} - Exercises</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{questions[questionIndex].question}</h2>
        <div className="space-y-4">
          {questions[questionIndex].options.map((option, index) => (
            <button
              key={index}
              className="block w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonExercise;