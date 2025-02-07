import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

const Appearance = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ my: 1 }}>
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={handleToggle} color="primary" />
          }
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
      </CardContent>
    </Card>
  );
};

export default Appearance;