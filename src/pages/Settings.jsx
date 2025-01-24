import { useState } from 'react';
import Button from '../components/Button';

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Simulate account deletion
      alert('Account deleted successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Settings</h1>

      {/* Language Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Language</h2>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Notifications</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">Enable notifications</span>
        </label>
      </div>

      {/* Theme Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Appearance</h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </label>
      </div>

      {/* Account Management */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account</h2>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 mb-4">
          Logout
        </Button>
        <Button onClick={handleDeleteAccount} className="bg-gray-500 hover:bg-gray-600">
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Settings;