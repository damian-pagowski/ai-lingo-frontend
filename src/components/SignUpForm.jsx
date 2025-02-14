import {
  Box,
  FormControl,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";

const SignUpForm = ({ formData, handleChange, handleSubmit }) => (
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
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
        value={formData.name}
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
        value={formData.email}
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
        value={formData.password}
      />
    </FormControl>
    <Button type="submit" fullWidth variant="contained">
      Sign up
    </Button>
  </Box>
);

export default SignUpForm;
