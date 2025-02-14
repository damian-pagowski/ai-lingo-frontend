import { Alert, Box } from "@mui/material";

const ErrorMessage = ({ error }) => (
  <Box textAlign="center" mt={5}>
    <Alert severity="error">{error}</Alert>
  </Box>
);

export default ErrorMessage;
