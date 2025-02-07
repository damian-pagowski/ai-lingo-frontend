import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress
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
    const fetchData = async () => {
      setLoading(true); 
      try {
        const [userData, preferencesData] = await Promise.all([
          getUserProfile(),
          getUserPreferences(),
        ]);
  
        setUser(userData || {});
        setFormData({
          name: userData?.name || "",
          email: userData?.email || "",
        });
  
        setPreferences(preferencesData?.preferences?.focus_areas
          ? JSON.parse(preferencesData.preferences.focus_areas)
          : []
        );
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);

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
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        textAlign="center"
        color="error"
        sx={{ width: "100%", mt: 4 }}
      >
        {error}
      </Typography>
    ); 
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb:4 }}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
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

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center"}}>
          {" "}
          <Button variant="outlined" sx={{ width: "100%" }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Stack>

      <ProfileEditDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Profile;