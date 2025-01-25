import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Damian',
    level: 'Intermediate (B1)',
    completedLessons: 5,
    totalLessons: 18,
    streak: 7,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Hi, {user.name} 👋</h1>
      <p className="text-lg text-gray-700 mb-6">Learning Level: {user.level}</p>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
        <p className="text-gray-700">
          Lessons Completed: {user.completedLessons}/{user.totalLessons}
        </p>
        <div className="relative w-full bg-gray-300 rounded-full h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${(user.completedLessons / user.totalLessons) * 100}%` }}
          ></div>
        </div>
        <p className="mt-4 text-gray-700">🔥 Streak: {user.streak} days</p>
      </div>

      {/* Suggested Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Next Step</h2>
        <p className="text-gray-700">Continue with your next lesson to maintain your streak.</p>
        <Button onClick={() => navigate('/lessons/1')} className="mt-4 bg-blue-500 hover:bg-blue-600">
          Continue Lesson
        </Button>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
        <p className="text-gray-700">You've completed 5 lessons! 🎉</p>
        <p className="text-gray-700">Next milestone: Complete 10 lessons to earn a badge.</p>
      </div>
    </div>
  );
};

export default Dashboard;