import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: false,
    inApp: false,
    time: "08:00",
  });

  const handleToggle = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTimeChange = (event) => {
    setNotifications({ ...notifications, time: event.target.value });
  };

  const handleSave = () => {
    console.log("Notification Settings Saved:", notifications);
  };

  return (
    <Card sx={{ my: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ my: 1 }}>
          Notification Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.email}
                onChange={handleToggle}
                name="email"
              />
            }
            label="Enable Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifications.inApp}
                onChange={handleToggle}
                name="inApp"
              />
            }
            label="Enable In-App Notifications"
          />
        </FormGroup>
        {(notifications.email || notifications.inApp) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Select Notification Time:</Typography>
            <Select
              value={notifications.time}
              onChange={handleTimeChange}
              fullWidth
              sx={{ mt: 1 }}
            >
              {["06:00", "08:00", "10:00", "12:00", "18:00", "20:00"].map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        <Button
          variant="outlined"
          sx={{ my: 2, width: "100%" }}
          onClick={handleSave}
        >
          Save Notifications
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;