import { useState, useEffect } from "react";
import Button from "../components/Button";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import { getUserProfile, updateOwnProfile } from "../api/userApi";

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Profile</h1>

      {user && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Info
            </h2>
            <p className="text-lg text-gray-700">Name: {user.name}</p>
            <p className="text-lg text-gray-700">Email: {user.email}</p>
            <p className="text-lg text-gray-700">
              Learning Level: {user.level}
            </p>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Progress
            </h2>
            <p className="text-gray-700">Lessons Completed: {user.progress}</p>
            <div className="relative w-full bg-gray-300 rounded-full h-3 mt-2">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{
                  width: `${(
                    (parseInt(user.progress.split("/")[0]) /
                      parseInt(user.progress.split("/")[1])) *
                    100
                  ).toFixed(0)}%`,
                }}
              ></div>
            </div>
            <p className="mt-4 text-gray-700">
              Current Streak: 🔥 {user.streak} days
            </p>
          </div>

          <div className="mt-6">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsDrawerOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
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
    </div>
  );
};

export default Profile;
