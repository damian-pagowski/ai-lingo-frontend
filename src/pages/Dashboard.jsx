import { useState, useEffect } from "react";
import Achievements from "../components/Achievements";
import { getUserProfile } from "../api/userApi";
import NextStep from "../components/NextStep";
import ProgressOverview from "../components/ProgressOverview";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const completedLessons = parseInt(user.progress.split("/")[0], 10);
  const totalLessons = parseInt(user.progress.split("/")[1], 10);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Hi, {user.name} 👋
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Current Course: {user.course_name}
      </p>
      <p className="text-lg text-gray-700 mb-6">Learning Level: {user.level}</p>

      <ProgressOverview
        completedLessons={completedLessons}
        totalLessons={totalLessons}
        streak={user.streak}
      />

      {user.current_lesson_id > 0 && (
        <NextStep lessonId={user.current_lesson_id} />
      )}

      {completedLessons > 0 && (
        <Achievements
          completedLessons={user.completedLessons}
          totalLessons={user.totalLessons}
        />
      )}
    </div>
  );
};

export default Dashboard;
