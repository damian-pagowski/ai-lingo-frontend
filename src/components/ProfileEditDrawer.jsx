import * as React from "react";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const ProfileEditDrawer = ({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <Drawer anchor={"bottom"} open={onClose} onClose={onClose}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mx: 4, my: 2 }}
      >
        <Typography component="h4" sx={{ mx: "auto" }}>
          Edit Your Details
        </Typography>
        <TextField
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <TextField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={onInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, my: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProfileEditDrawer;
