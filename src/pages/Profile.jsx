import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import NotificationSettings from "../components/NotificationSettings";
import { getUserProfile, updateOwnProfile } from "../api/userApi";
import { getUserPreferences } from "../api/preferencesApi";
import Appearance from "../components/Appearance";
import PersonalInfoCard from "../components/PersonalInfoCard";
import LearningGoalsCard from "../components/LearningGoalsCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
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
      }
    };

    const fetchUserPreferences = async () => {
      try {
        const data = await getUserPreferences();
        setPreferences(JSON.parse(data.preferences.focus_areas));
      } catch (err) {
        console.error("Error fetching preferences:", err);
      }
    };

    fetchUserProfile();
    fetchUserPreferences();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(preferences));
  }, [preferences]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

  return (
    <Stack>
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
        <PersonalInfoCard user={user} onEdit={() => setIsDrawerOpen(true)} />
      )}
      {preferences && (
        <LearningGoalsCard
          preferences={preferences}
          onEdit={() => navigate("/setup")}
        />
      )}
      <NotificationSettings />
      <Appearance />
      <Box sx={{ justifyContent: "center", mb: 6 }}>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
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
