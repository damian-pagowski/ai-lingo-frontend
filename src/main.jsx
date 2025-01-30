import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import LessonList from './pages/LessonList';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2';
import LessonExercise from './pages/LessonExercise';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';
import Settings from './pages/Settings';
import UserSetup from './pages/UserSetup';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Signup2 from './pages/Signup2';
// import Login2 from './pages/Login2';
import BottomNavigation from './components/layout/BottomNavigation';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Navbar />
    <div className="p-6">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lessons" element={<LessonList />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />

        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/lessons/:id/exercise" element={<LessonExercise />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/setup" element={<UserSetup />} />
        {/* <Route path="/signup2" element={<Signup2 />} />
        <Route path="/login2" element={<Login2 />} /> */}

      </Routes>
      <BottomNavigation/>
      </div>

    </Router>
  </React.StrictMode>
);