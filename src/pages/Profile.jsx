import { useState } from 'react';
import Button from '../components/Button';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Damian',
    email: 'damian@example.com',
    level: 'Intermediate (B1)',
    completedLessons: 5,
    totalLessons: 18,
    streak: 7,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Info</h2>
        <p className="text-lg text-gray-700">Name: {user.name}</p>
        <p className="text-lg text-gray-700">Email: {user.email}</p>
        <p className="text-lg text-gray-700">Learning Level: {user.level}</p>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
        <p className="text-gray-700">Lessons Completed: {user.completedLessons} / {user.totalLessons}</p>
        <div className="relative w-full bg-gray-300 rounded-full h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${(user.completedLessons / user.totalLessons) * 100}%` }}
          ></div>
        </div>
        <p className="mt-4 text-gray-700">Current Streak: 🔥 {user.streak} days</p>
      </div>

      <div className="mt-6">
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => alert('Edit Profile Coming Soon!')}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;