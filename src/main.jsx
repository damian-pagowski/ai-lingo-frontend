import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import LessonList from './pages/LessonList';
import Dashboard from './pages/Dashboard';
import LessonExercise from './pages/LessonExercise';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';
import Settings from './pages/Settings';

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
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/lessons/:id/exercise" element={<LessonExercise />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />


      </Routes>
      </div>

    </Router>
  </React.StrictMode>
);