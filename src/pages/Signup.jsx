import React, { useState } from "react";
import { Box, Card, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import SignUpForm from "../components/SignUpForm";
import ErrorAlert from "../components/ErrorAlert";

const SignUp = () => {
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
        <SignUpForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <LoginLink />
        {error && <ErrorAlert error={error} setError={setError} />}
      </Card>
    </Box>
  );
};

const LoginLink = () => (
  <Typography textAlign="center">
    Already have an account?{" "}
    <Link href="/login" variant="body2">
      Sign in
    </Link>
  </Typography>
);

export default SignUp;
