import { useState, useEffect } from "react";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import { getUserProfile, updateOwnProfile } from "../api/userApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import BorderLinearProgress from "@mui/material/LinearProgress"; // Adjust the import path if it's a custom component

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        setError("Failed to fetch user profile. Please try again.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateOwnProfile(formData);
      setUser({ ...user, ...formData });
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const completedLessons = parseInt(user.progress.split("/")[0], 10);
  const totalLessons = parseInt(user.progress.split("/")[1], 10);

  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

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
        Your Profile
      </Typography>

      {user && (
        <>
          {/* c1 */}
          <Card sx={{ minWidth: 275, my: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ my: 1 }}>
                Personal Info
              </Typography>

              <Typography variant="body2">Name: {user.name}</Typography>
              <Typography variant="body2">Email: {user.email}</Typography>
              <Typography variant="body2">
                Learning Level: {user.level}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => setIsDrawerOpen(true)}>
                Edit Profile
              </Button>
            </CardActions>
          </Card>
          {/* c2 */}
          <Card sx={{ minWidth: 275, my: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ my: 1 }}>
                Your Progress
              </Typography>

              <Typography variant="body2">
                Lessons Completed: {user.progress}
              </Typography>
              <BorderLinearProgress
                sx={{ my: 1 }}
                variant="determinate"
                value={progressPercentage}
              />

              <Typography variant="body2">
                Current Streak: 🔥 {user.streak} days
              </Typography>
            </CardContent>
          </Card>
        </>
      )}

      {/* Profile Edit Drawer */}
      <ProfileEditDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};

export default Profile;
