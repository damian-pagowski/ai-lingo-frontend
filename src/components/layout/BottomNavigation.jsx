import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, MenuBook, Person, Settings, ExitToApp } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/dashboard')} />
        <BottomNavigationAction label="Lessons" icon={<MenuBook />} onClick={() => navigate('/lessons')} />
        <BottomNavigationAction label="Profile" icon={<Person />} onClick={() => navigate('/profile')} />
        {/* <BottomNavigationAction label="Settings" icon={<Settings />} onClick={() => navigate('/settings')} /> */}
        {/* <BottomNavigationAction label="Logout" icon={<ExitToApp />} onClick={handleLogout} /> */}
      </BottomNavigation>
    </Paper>
  );
};