import { useState, useEffect } from "react";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import { getUserProfile, updateOwnProfile } from "../api/userApi";
import { getUserPreferences } from "../api/preferencesApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

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
    navigate("/login")
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
          {/* c1 - Personal Info */}
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
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="outlined" onClick={() => setIsDrawerOpen(true)}>
                Edit Profile
              </Button>
            </CardActions>
          </Card>

          {/* c2 - Learning Goals */}
          {preferences && (
            <Card sx={{ minWidth: 275, my: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ my: 1 }}>
                  Learning Goals
                </Typography>
                <ul>
                  {preferences.map((topic, index) => (
                    <li key={index}>
                      <Typography variant="body2">
                        {topic
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="outlined" onClick={() => navigate("/setup")}>
                  Edit Preferences
                </Button>
              </CardActions>
            </Card>
          )}
          <Box sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleLogout}>
          Logout
            </Button>
          </Box>
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
