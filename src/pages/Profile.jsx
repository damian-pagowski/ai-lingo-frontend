import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import NotificationSettings from "../components/NotificationSettings";
import { updateOwnProfile } from "../api/userApi";
import Appearance from "../components/Appearance";
import PersonalInfoCard from "../components/PersonalInfoCard";
import LearningGoalsCard from "../components/LearningGoalsCard";
import { useDashboard } from "../context/DashboardContext";
import { usePreferences } from "../context/PreferencesContext";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";

const Profile = () => {
  const {
    user,
    refreshDashboard,
    loading: dashboardLoading,
    error: dashboardError,
  } = useDashboard();
  const {
    preferences,
    loading: preferencesLoading,
    error: preferencesError,
    refreshPreferences,
  } = usePreferences();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

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
      await refreshDashboard();
      await refreshPreferences();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile");
    }
  };

  if (dashboardLoading || preferencesLoading) {
    return <LoadingIndicator />;
  }

  if (dashboardError || preferencesError) {
    return <ErrorMessage error={dashboardError + preferencesError} />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", width: "100%", p: 2, mb: 4 }}>
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

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={handleLogout}
          >
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
