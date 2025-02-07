import React, { useState } from "react";
import {
  Box,
  Card,
  FormControl,
  Typography,
  TextField,
  Stack,
  Link,
  Button,
  FormLabel,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    try {
      await registerUser(formData.name, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", width: "100%", p: 2 }}>
      <Card sx={{ p: 3 }}>
        <Typography
          component="h1"
          variant="h4"
          textAlign="center"
          sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="name"
              onChange={handleChange}
              name="name"
              required
              id="name"
              placeholder="Joe Doe"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              id="email"
              placeholder="your@email.com"
              name="email"
              onChange={handleChange}
              autoComplete="email"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="new-password"
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>

          <Typography textAlign="center">
            Already have an account?{" "}
            <Link href="/login" variant="body2">
              Sign in
            </Link>
          </Typography>

          {error && (
            <Alert severity="warning" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Box>
      </Card>
    </Box>
  );
}