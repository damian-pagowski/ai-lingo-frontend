import {Alert,
} from "@mui/material";

const ErrorAlert = ({ error, setError }) => (
  <Alert severity="warning" onClose={() => setError(null)}>
    {error}
  </Alert>
);

export default ErrorAlert;