import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Person } from '@mui/icons-material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
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
        <BottomNavigationAction label="Practice" icon={<FitnessCenterIcon />} onClick={() => navigate('/lessons')} />
        <BottomNavigationAction label="Ranking" icon={<StarIcon />} onClick={() => navigate('/ranking')} />
        <BottomNavigationAction label="Profile" icon={<Person />} onClick={() => navigate('/profile')} />
      </BottomNavigation>
    </Paper>
  );
};