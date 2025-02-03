import { useState, useEffect } from "react";
import { getUserProfile } from "../api/userApi";
import NextStep from "../components/NextStep";
import ProgressOverview from "../components/ProgressOverview";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { getUserProgress } from "../api/progressApi";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data || {});
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const data = await getUserProgress();
        setProgress(data || {});
      } catch (err) {
        console.error("Error fetching user progress:", err);
        setError("Failed to load user progress. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <Stack
      sx={{
        justifyContent: "center",
        height: { xs: "100%", sm: "100dvh" },
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mx: "auto",
          mb: 2,
        }}
      >
        Hi, {user?.name || "User"} 👋
      </Typography>
      <Stack spacing={2}>
        <Typography variant="body1" gutterBottom>
          Current Course: {user?.course_name || "Not Assigned"}
        </Typography>
      </Stack>
      {progress && <ProgressOverview progress={progress} />}
      {user?.current_lesson_id > 0 && (  
        <NextStep lessonId={user.current_lesson_id} />
      )}
    </Stack>
  );
};

export default Dashboard;