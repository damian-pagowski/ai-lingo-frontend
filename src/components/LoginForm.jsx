import {
    TextField,
    Box,
    Button,
    FormLabel,
    FormControl,
  } from "@mui/material";


const LoginForm = ({ email, password, setEmail, setPassword, handleSubmit }) => (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
    >
      <FormControl fullWidth>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Sign in
      </Button>
    </Box>
  );
export default   LoginForm;