import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingIndicator = () => (
<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={5}>
<CircularProgress />
  </Box>
);

export default LoadingIndicator;
