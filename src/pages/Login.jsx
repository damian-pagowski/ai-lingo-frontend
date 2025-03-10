import React, { useState } from "react";
import { Card, Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import LoginForm from "../components/LoginForm";
import ErrorAlert from "../components/ErrorAlert";
import { useDashboard } from "../context/DashboardContext";
import { useLessons } from "../context/LessonsContext";
import { usePreferences } from "../context/PreferencesContext";
import { useRanking } from "../context/RankingContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { refreshDashboard } = useDashboard();
  const { refreshLessons } = useLessons();
  const { refreshPreferences } = usePreferences();
  const { refreshRanking } = useRanking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      setTimeout(refreshDashboard, 100);
      setTimeout(refreshLessons, 100);
      setTimeout(refreshPreferences, 100);
      setTimeout(refreshRanking, 100);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
          Sign in
        </Typography>
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
        <SignUpLink />
        {error && <ErrorAlert error={error} setError={setError} />}
      </Card>
    </Box>
  );
};

const SignUpLink = () => (
  <Typography textAlign="center">
    Don&apos;t have an account?{" "}
    <Link href="/signup" variant="body2">
      Sign up
    </Link>
  </Typography>
);

export default Login;
